<?php
/**
 * @file
 * Well this actual imports and exports, just like Vandalay Industries
 */

define('ALQ_MPS_EMAILEE_NODE_TYPE', 'emailee');

/**
 * Callback to export emailees to json
 */
function alq_mps_export_emailees() {
  $query = db_select('node', 'n');
  $query->join('field_data_field_party', 'fdfp', 'fdfp.entity_id = n.nid');
  $query->fields('n', array('nid'))
    ->condition('n.type', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfp.field_party_value', 'N/A', '!='); // ignore test users
  $nids = $query->execute()->fetchCol();

  $nodes = node_load_multiple($nids);

  foreach ($nodes as &$node) {
    foreach ($node->field_office[LANGUAGE_NONE] as $entity_id) {
      $node->offices[] = entity_load('field_collection_item', [$entity_id['value']]);
    }
  }

  drush_log(dt('@function - Exporting @nodes @type', [
    '@function' => __FUNCTION__,
    '@nodes' => count($nodes),
    '@type' => ALQ_MPS_EMAILEE_NODE_TYPE
  ]), 'notice');

  print drupal_json_encode($nodes);
}

/**
 * Call back to import emailees from json file
 *
 * @param $file
 * @return bool
 */
function alq_mps_import_emailees($file) {
  alq_mps_check_import($file);

  $jsonNodes = getJsonNodes($file);

  $successes = 0;

  $transaction = db_transaction();
  foreach ($jsonNodes as $jsonNode) {
    $node = alq_mps_find_emailee($jsonNode);
    if ($node) {
      if (alq_mps_update_emailee($node, $jsonNode)) {
        ++$successes;
      }
      else {
        drush_log(dt('Update failed for nid: @nid', ['@nid' => $jsonNode['nid']]), 'error');
        $transaction->rollback();
        return FALSE;
      }
    }
    else {
      drush_log(dt('Unable to find @nid', ['@nid' => $jsonNode['nid']]), 'error');
    }
  }
  drush_log(dt('Updated @successes nodes out of @nodes', [
    '@successes' => $successes,
    '@nodes' => count($jsonNodes)
  ]), 'notice');
}

/**
 * @param $file
 * @return mixed
 */
function getJsonNodes($file) {
  $json = file_get_contents($file);

  $jsonNodes = drupal_json_decode($json);

  drush_log(dt('Read @nodes objects from @file', [
    '@nodes' => count($jsonNodes),
    '@file' => $file
  ]), 'notice');
  return $jsonNodes;
}

/**
 * @param $file
 */
function alq_mps_check_import($file) {
  if (empty($file)) {
    drush_log(dt('File parameter is required'), 'error');
    exit(1);
  }
  if (!file_exists($file)) {
    drush_log(dt('File not found: @file', ['@file' => $file]), 'error');
    exit(1);
  }
}

/**
 * Update an invidual emailee's whole record
 *
 * @param $node
 * @param $newDetails
 * @return bool
 */
function alq_mps_update_emailee($node, $newDetails) {
  if (alq_mps_update_node($node, $newDetails)) {
    if (alq_mps_update_offices($node, $newDetails)) {
      return TRUE;
    }
    drush_log(dt('Failed to update offices @nid', ['@nid' => $newDetails['nid']]), 'error');
  }
  else {
    drush_log(dt('Failed to update @nid', ['@nid' => $newDetails['nid']]), 'error');
  }

  return FALSE;
}

/**
 * Do our best to find each MP, using electorate and name
 *
 * @param $details
 * @return bool|mixed
 */
function alq_mps_find_emailee($details) {
  // try to deal with inconsistent punctuation etc
  $familyName = preg_replace('/\W/', '_', $details['field_family_name']['und'][0]['value']);
  $givenNames = preg_replace('/\W/', '_', $details['field_given_names']['und'][0]['value']);
  $party = $details['field_party']['und'][0]['value'];
  $electorate = preg_replace('/\W/', '_', $details['field_electorate']['und'][0]['value']);
  $query = db_select('node', 'n');
  $query->join('field_data_field_party', 'fdfp', 'fdfp.entity_id = n.nid');
  $query->join('field_data_field_electorate', 'fdfe', 'fdfe.entity_id = n.nid');
  $query->fields('n', array('nid'))
    ->condition('n.type', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('n.title', '%' . $familyName . '%' . $givenNames . '%', 'like')
    ->condition('fdfp.entity_type', 'node')
    ->condition('fdfp.bundle', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfp.field_party_value', $party)
    ->condition('fdfe.entity_type', 'node')
    ->condition('fdfe.bundle', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfe.field_electorate_value', $electorate, 'like');

  $nid = $query->execute()->fetchField();

  if ($nid) {
    return node_load($nid);
  }

  return FALSE;
}

/**
 * Update the mps details, excepting office which is a field collection
 *
 * @param $node
 * @param $details
 * @return mixed
 */
function alq_mps_update_node($node, $details) {
  $fields = [
    'field_family_name',
    'field_given_names',
    'field_position',
    'field_preferred_name',
    'field_qualifications',
    'title'
  ];
  $node_wrapper = entity_metadata_wrapper('node', $node);
  $node_wrapper->title->set($details['title']);
  foreach ($fields as $field) {
    if (is_array($details[$field]) && array_key_exists('und', $details[$field])) {
      $node_wrapper->$field->set($details[$field]['und'][0]['value']);
    }
  }
  return $node_wrapper->save();
}

/**
 * Update offices which is an evil field collection
 * took me as long to write this function as the whole
 * rest of the import export drush command etc.
 *
 * @param $rawNode
 * @param $newDetails
 * @return bool
 */
function alq_mps_update_offices($rawNode, $newDetails) {
  $node = entity_metadata_wrapper('node', $rawNode);
  $rawOffices = $node->field_office->value();
  $newOffices = $newDetails['offices'];
  $errors = 0;

  for ($i = 0, $l = count($newOffices); $i < $l; $i++) {
    $office = entity_metadata_wrapper('field_collection_item', $rawOffices[$i]);
    // In json there is an extra level of the array here so double shift
    // I'm sure there's a good reason for it
    $newOffice = array_shift($newOffices[$i]);
    $fields = [
      'field_address',
      'field_fax',
      'field_phone',
      'field_postcode',
      'field_toll_free_phone'
    ];

    foreach ($fields as $field) {
      $officeVal = $office->$field->value();
      $val = $newOffice[$field][LANGUAGE_NONE][0]['value'];
      $office->$field->set(is_array($officeVal) ? [$val] : $val);
    }

    if (!$office->save()) {
      drush_log(dt('Unable to save office @office', ['@office' => json_encode($office)]), 'error');
      ++$errors;
    }
  }

  return $errors === 0;
}
