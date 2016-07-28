<?php
/**
 * @file
 * Well this actual imports and exports, just like Vandalay Industries
 */

define('ALQ_MPS_EMAILEE_NODE_TYPE', 'emailee');

function alq_mps_export_emailees() {
  $nids = db_select('node', 'n')
    ->fields('n', array('nid'))
    ->condition('n.type', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->execute()
    ->fetchCol();

  $nodes = node_load_multiple($nids);

  foreach ($nodes as &$node) {
    foreach ($node->field_office[LANGUAGE_NONE] as $entity_id) {
      $node->offices[] = entity_load('field_collection_item', [$entity_id['value']]);
    }
  }

  print drupal_json_encode($nodes);
}

function alq_mps_import_emailees($file) {
  if (empty($file)) {
    drush_print('File parameter is required');
    exit(1);
  }
  if (!file_exists($file)) {
    drush_print('File not found: ' . $file);
    exit(1);
  }

  $json = file_get_contents($file);

  $jsonNodes = drupal_json_decode($json);

  drush_print('Read ' . count($jsonNodes) . ' objects from ' . $file);

  $successes = 0;

  foreach ($jsonNodes as $jsonNode) {
    if (alq_mps_update_emailee($jsonNode)) {
      ++$successes;
    }
    else {
      drush_print('Update failed, exiting: nid ' . $jsonNode['nid']);
      return FALSE;
    }
  }
  drush_print('Updated ' . $successes . ' nodes out of ' . count($jsonNodes));
}

function alq_mps_update_emailee($newDetails) {
  $node = alq_mps_find_emailee($newDetails);
  if ($node) {
    if (alq_mps_update_node($node, $newDetails)) {
      if (alq_mps_update_offices($node, $newDetails)) {
        return TRUE;
      }
      else {
        drush_print('Failed to update offices ' . $newDetails['nid']);
      }
    }
    else {
      drush_print('Failed to update ' . $newDetails['nid']);
    }
  }
  else {
    drush_print('Failed to find ' . $newDetails['nid']);
  }

  return FALSE;
}

function alq_mps_find_emailee($details) {
  $familyName = $details['field_family_name']['und'][0]['value'];
  $givenNames = $details['field_given_names']['und'][0]['value'];
  $party = $details['field_party']['und'][0]['value'];
  $electorate = $details['field_electorate']['und'][0]['value'];
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
    ->condition('fdfe.field_electorate_value', $electorate);

  $nid = $query->execute()->fetchField();

  if ($nid) {
    return node_load($nid);
  }

  return FALSE;
}

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
      drush_print('Unable to save office ' . json_encode($office));
      ++$errors;
    }
  }

  return $errors === 0;
}
