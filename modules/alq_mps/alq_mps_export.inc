<?php

/**
 * @file
 * Well this actual imports and exports, just like Vandalay Industries.
 */

define('ALQ_MPS_EMAILEE_NODE_TYPE', 'emailee');

/**
 * Callback to export emailees to json.
 */
function alq_mps_export_emailees() {
  $query = db_select('node', 'n');
  $query->join('field_data_field_party', 'fdfp', 'fdfp.entity_id = n.nid');
  $query->fields('n', ['nid'])
    ->condition('n.type', ALQ_MPS_EMAILEE_NODE_TYPE)
  // Ignore test users.
    ->condition('fdfp.field_party_value', 'N/A', '!=');
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
    '@type' => ALQ_MPS_EMAILEE_NODE_TYPE,
  ]), 'notice');

  print drupal_json_encode($nodes);
}

/**
 * Call back to import emailees from json file.
 *
 * @param string $file
 *   Json encoded file.
 *
 * @return bool
 *   Success.
 */
function alq_mps_import_emailees($file) {
  alq_mps_check_import($file);

  $jsonNodes = get_json_nodes($file);

  $successes = 0;

  $transaction = db_transaction();
  foreach ($jsonNodes as $jsonNode) {
    $node = alq_mps_find_emailee($jsonNode);
    if ($node) {
      drush_log(dt('Found @nid - @title', [
        '@nid' => $node->nid,
        '@title' => $node->title,
      ]));

      if (alq_mps_update_emailee($node, $jsonNode)) {
        ++$successes;
        drush_log(dt('Updated nid @nid (import nid @inid)', [
          '@nid' => $node->nid,
          '@inid' => $jsonNode['nid'],
        ]), 'info');
      }
      else {
        drush_log(dt('Update failed for nid: @nid', ['@nid' => $jsonNode['nid']]), 'error');
        $transaction->rollback();
        return FALSE;
      }
    }
    else {
      drush_log(dt('Unable to find import nid @nid, creating', ['@nid' => $jsonNode['nid']]), 'error');
      alq_mps_create_emailee($jsonNode);
    }
  }
  drush_log(dt('Updated @successes nodes out of @nodes', [
    '@successes' => $successes,
    '@nodes' => count($jsonNodes),
  ]), 'notice');

  return TRUE;
}

/**
 * Get me some nodes.
 *
 * @param string $file
 *   File path.
 *
 * @return mixed
 *   Return array of NULL.
 */
function get_json_nodes($file) {
  $json = file_get_contents($file);

  $jsonNodes = drupal_json_decode($json);

  drush_log(dt('Read @nodes objects from @file', [
    '@nodes' => count($jsonNodes),
    '@file' => $file,
  ]), 'notice');

  return $jsonNodes;
}

/**
 * Do some basic checks on import.
 *
 * @param string $file
 *   Pat hto file.
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
 * Update an individual emailee's whole record.
 *
 * @param object $node
 *   Node to update.
 * @param array $newDetails
 *   New details to update.
 *
 * @return bool
 *   Success.
 */
function alq_mps_update_emailee($node, array $newDetails) {
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
 * Do our best to find each MP, using electorate.
 *
 * @param array $details
 *   Multidimensional details array.
 *
 * @return mixed
 *   Loaded node or FALSE.
 */
function alq_mps_find_emailee(array $details) {
  $electorate = $details['field_electorate'][LANGUAGE_NONE][0]['value'];
  $type = $details['field_electorate_type'][LANGUAGE_NONE][0]['value'];

  drush_print(dt('Searching for @electorate type @type', [
    '@electorate' => $electorate,
    '@type' => $type,
  ]));

  $query = db_select('node', 'n');
  $query->join('field_data_field_electorate', 'fdfe', 'fdfe.entity_id = n.nid');
  $query->join('field_data_field_electorate_type', 'fdfet', 'fdfet.entity_id = n.nid');
  $query->fields('n', ['nid'])
    ->condition('n.type', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfet.entity_type', 'node')
    ->condition('fdfet.bundle', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfet.field_electorate_type_value', $type)
    ->condition('fdfe.entity_type', 'node')
    ->condition('fdfe.bundle', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfe.field_electorate_value', $electorate);

  $nid = $query->execute()->fetchField();

  if ($nid) {
    return node_load($nid);
  }

  return FALSE;
}

/**
 * Create an emailee.
 *
 * @param array $details
 *   Row details.
 *
 * @return array
 *   Result of mp create.
 */
function alq_mps_create_emailee(array $details) {
  $fields['name'] = $details['title'];

  $keys = [
    'electorate_type',
    'electorate',
    'given_names',
    'family_name',
    'preferred_name',
    'party',
    'position',
    'qualifications',
    'title',
  ];

  foreach ($keys as $key) {
    if (isset($details['field_' . $key][LANGUAGE_NONE][0]['value'])) {
      $fields[$key] = $details['field_' . $key][LANGUAGE_NONE][0]['value'];
    }
  }

  $fields['offices'] = [];

  foreach ($details['offices'] as $office_array) {
    $office = [];
    $office_raw = array_shift($office_array);

    $keys = [
      'address',
      'fax',
      'phone',
      'postcode',
      'toll_free_phone',
    ];

    foreach ($keys as $key) {
      if (isset($office_raw['field_' . $key][LANGUAGE_NONE][0]['value'])) {
        $office[$key] = $office_raw['field_' . $key][LANGUAGE_NONE][0]['value'];
      }
    }

    if (isset($office_raw['field_email'][LANGUAGE_NONE][0]['email'])) {
      $office['email'] = $office_raw['field_email'][LANGUAGE_NONE][0]['email'];
    }

    $fields['offices'][] = $office;
  }

  return alq_mps_create($fields);
}

/**
 * Update the mps details, excepting office which is a field collection.
 *
 * @param object $node
 *   Node to update.
 * @param array $details
 *   MP details.
 *
 * @return mixed
 *   Result of saving node.
 */
function alq_mps_update_node($node, array $details) {
  $fields = [
    'field_family_name',
    'field_given_names',
    'field_party',
    'field_position',
    'field_preferred_name',
    'field_qualifications',
    'field_title',
    'title',
  ];
  $node_wrapper = entity_metadata_wrapper('node', $node);
  $node_wrapper->title->set($details['title']);
  foreach ($fields as $field) {
    if (is_array($details[$field]) && array_key_exists(LANGUAGE_NONE, $details[$field])) {
      $node_wrapper->$field->set($details[$field][LANGUAGE_NONE][0]['value']);
    }
  }
  return $node_wrapper->save();
}

/**
 * Update offices.
 *
 * Which is an evil field collection
 * took me as long to write this function as the whole
 * rest of the import export drush command etc.
 *
 * @param object $rawNode
 *   Node object.
 * @param array $newDetails
 *   New details to be updated.
 *
 * @return bool
 *   Success.
 */
function alq_mps_update_offices($rawNode, array $newDetails) {
  $node = entity_metadata_wrapper('node', $rawNode);
  $rawOffices = $node->field_office->value();
  $newOffices = $newDetails['offices'];
  $errors = 0;

  for ($i = 0, $l = count($newOffices); $i < $l; $i++) {
    if (isset($rawOffices[$i])) {
      $office = entity_metadata_wrapper('field_collection_item', $rawOffices[$i]);
      // In json there is an extra level of the array here so double shift
      // I'm sure there's a good reason for it.
      $newOffice = array_shift($newOffices[$i]);
      $fields = [
        'field_address',
        'field_fax',
        'field_phone',
        'field_postcode',
        'field_toll_free_phone',
      ];

      foreach ($fields as $field) {
        if (property_exists($office, $field)) {
          $officeVal = $office->$field->value();
          $val = isset($newOffice[$field][LANGUAGE_NONE][0]['value']) ? $newOffice[$field][LANGUAGE_NONE][0]['value'] : NULL;
          $office->$field->set(is_array($officeVal) ? [$val] : $val);
        }
      }

      if (!$office->save()) {
        drush_log(dt('Unable to save office @office', ['@office' => json_encode($office)]), 'error');
        ++$errors;
      }
    }
  }

  return $errors === 0;
}
