<?php

/**
 * @file
 * alq_menus_feature.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function alq_menus_feature_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'xmlsitemap_settings_menu_link_menu-header-menu';
  $strongarm->value = array(
    'priority' => '0.5',
    'status' => '0',
  );
  $export['xmlsitemap_settings_menu_link_menu-header-menu'] = $strongarm;

  return $export;
}
