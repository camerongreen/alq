<?php
/**
 * @file
 * Well this actual imports and exports, just like Vandalay Industries
 */

define('ALQ_MPS_EMAILEE_NODE_TYPE', 'emailee');

function alq_mps_export_emailees() {
  $nids = db_select('node', 'n')
    ->fields('n', array('nid'))
    ->fields('n', array('type'))
    ->condition('n.type', ALQ_MPS_EMAILEE_NODE_TYPE)
    ->execute()
    ->fetchCol();

  $nodes = node_load_multiple($nids);

  foreach ($nodes as $node) {
    foreach ($node->field_office[LANGUAGE_NONE] as $entity_id) {
      $node->offices[] = entity_load('field_collection_item', [$entity_id['value']]);
    }
  }

  print drupal_json_encode($nodes);
}
