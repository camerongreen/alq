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

  drush_print('Found ' . count($jsonNodes) . ' objects in ' . $file);

  $successes = 0;

  foreach ($jsonNodes as $jsonNode) {
    if (alq_mps_update_emailee($jsonNode)) {
      ++$successes;
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

function alq_mps_find_emailee($jsonNode) {
  $nid = db_select('node', 'n')
    ->join('field_data_field_party', 'fdfp', 'fdfp.entity_id = n.nid')
    ->join('field_data_field_electorate', 'fdfe', 'fdfe.entity_id = n.nid')
    ->fields('n', array('nid'))
    ->condition('n.type', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('n.title', '%' . $jsonNode['title'] . '%', 'like')
    ->condition('fdfp.entity_type', 'node')
    ->condition('fdfp.bundle', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfp.field_party_value', $jsonNode['field_party']['und'][0]['value'])
    ->condition('fdfe.entity_type', 'node')
    ->condition('fdfe.bundle', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->condition('fdfe.field_electorate_value', $jsonNode['field_electorate']['und'][0]['value'])
    ->execute()
    ->fetchField();

  if ($nid) {
    return node_load($nid);
  }

  return FALSE;
}

function alq_mps_update_node($node, $newDetails) {
  $node_wrapper = entity_metadata_wrapper('node', $node);
  $node_wrapper->title->set($newDetails['title']);
  $node_wrapper->field_title->set($newDetails['field_title']);
  $node_wrapper->field_family_name->set($newDetails['field_family_name']['und'][0]['value']);
  $node_wrapper->field_given_names->set($newDetails['field_given_names']['und'][0]['value']);
  $node_wrapper->field_preferred_name->set($newDetails['field_preferred_name']['und'][0]['value']);
  $node_wrapper->field_position->set($newDetails['field_position']['und'][0]['value']);
  $node_wrapper->field_qualifications->set($newDetails['field_qualifications']['und'][0]['value']);
  return $node_wrapper->save();
}

function alq_mps_update_offices($node, $newDetails) {
  $newOffices = $newDetails['offices'];
  $errors = 0;
  foreach ($node->field_office[LANGUAGE_NONE] as $entity_id) {
    $office = entity_load('field_collection_item', [$entity_id['value']]);
    // assume offices are in the same order
    // for some reason in json there is an extra level of the array here
    $newOffice = array_shift(array_shift($newOffices));
    $office->field_address = $newOffice['field_address']['und'][0]['value'];
    $office->field_fax = $newOffice['field_fax']['und'][0]['value'];
    $office->field_phone = $newOffice['field_phone']['und'][0]['value'];
    $office->field_postcode = $newOffice['field_postcode']['und'][0]['value'];
    $office->field_toll_free_phone = $newOffice['field_toll_free_phone']['und'][0]['value'];
    if (!$office->save()) {
      drush_print('Error saving ' . $office['item_id']);
    }

  }
}
