<?php
/**
 * @file
 * alq_menus_feature.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function alq_menus_feature_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-footer-menu.
  $menus['menu-footer-menu'] = array(
    'menu_name' => 'menu-footer-menu',
    'title' => 'Footer Menu',
    'description' => 'Links at the bottom of each page',
  );
  // Exported menu: menu-header-menu.
  $menus['menu-header-menu'] = array(
    'menu_name' => 'menu-header-menu',
    'title' => 'Site Navigation',
    'description' => 'This is the menu which is on every page under the AL Header',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Footer Menu');
  t('Links at the bottom of each page');
  t('Site Navigation');
  t('This is the menu which is on every page under the AL Header');


  return $menus;
}
