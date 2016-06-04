<?php
/**
 * @file
 * alq_mps_feature.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function alq_mps_feature_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function alq_mps_feature_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function alq_mps_feature_node_info() {
  $items = array(
    'email_campaign' => array(
      'name' => t('Email Campaign'),
      'base' => 'node_content',
      'description' => t('Email component of email campaign'),
      'has_title' => '1',
      'title_label' => t('Subject'),
      'help' => '',
    ),
    'emailee' => array(
      'name' => t('Emailee'),
      'base' => 'node_content',
      'description' => t('Person who will be emailed in an email campaign'),
      'has_title' => '1',
      'title_label' => t('Name'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
