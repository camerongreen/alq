<?php

/**
 * @file
 * Rodeos theme overrides.
 *
 * This file is empty by default because the base theme chain (Alpha & Omega)
 *   provides all the basic functionality. However, in case you wish to
 *   customize the output that Drupal generates through Alpha & Omega this file
 *   is a good place to do so.
 *
 * Alpha comes with a neat solution for keeping this file as clean as possible
 *   while the code for your subtheme grows. Please read the README.txt in the
 *   /preprocess and /process subfolders for more information on this topic.
 */

/**
 * Implements hook_preprocess_html().
 */
function rodeos_preprocess_html(&$vars) {
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'ui.autocomplete');
  drupal_add_library('system', 'jquery.cookie');

  // Make sure boostrap appears after formalize.
  $weight = 200;

  // Add bootstrap cdn.
  drupal_add_css('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', [
    'type' => 'external',
    'weight' => $weight,
  ]);
  drupal_add_css('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css', [
    'type' => 'external',
    'weight' => $weight + 1,
  ]);
  drupal_add_js('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', ['type' => 'external']);
  drupal_add_css('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', ['type' => 'external']);

  // Add fonts we will use.
  drupal_add_css('//fonts.googleapis.com/css?family=Hind|Open Sans', ['type' => 'external']);

  // And out script we'll do tricky things with.
  drupal_add_js(path_to_theme() . '/js/rodeos.js');
}

/**
 * Implements hook_menu_tree__MENU().
 */
function rodeos_menu_tree__main_menu($variables) {
  global $_rodeos_cur_level_menu_main_menu;
  if ($_rodeos_cur_level_menu_main_menu === "1") {
    $output = '<ul role="menu" class="main-menu menu-cnt col-sm-9 col-xs-12">' . $variables['tree'] . '</ul>';
  }
  else {
    $output = '<ul role="menu" class="menu-cnt">' . $variables['tree'] . '</ul>';
  }
  $_rodeos_cur_level_menu_main_menu--;
  return $output;
}

/**
 * Implements hook_menu_link__MENU().
 */
function rodeos_menu_link__main_menu($variables) {
  $element = $variables['element'];
  $sub_menu = '';

  global $_rodeos_cur_level_menu_main_menu;
  $_rodeos_cur_level_menu_main_menu = $element['#original_link']['depth'];

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  if (strtolower($element['#title']) === 'home') {
    $title = '<icon class="fa fa-home"></icon>';
  }
  else {
    $title = htmlspecialchars($element['#title']);
  }

  $output = l($title, $element['#href'], array_merge($element['#localized_options'], ['html' => TRUE]));
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Alter the page.
 */
function rodeos_page_alter($page) {
  global $base_url;

  if (drupal_is_front_page()) {
    $meta_og_image = [
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => [
        'property' => 'og:image',
        'content' => $base_url . '/' . drupal_get_path('theme', 'rodeos') . '/images/share_image.png',
      ],
    ];

    $meta_og_title = [
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => [
        'property' => 'og:title',
        'content' => 'RethinkRodeos.com',
      ],
    ];

    $meta_og_desc = [
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => [
        'property' => 'og:description',
        'content' => 'Grown men causing fear, stress and pain to calves all in the name of entertainment is simply wrong. Please help stop this bullying of baby animals.',
      ],
    ];

    $meta_og_url = [
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => [
        'property' => 'og:url',
        'content' => 'rethinkrodeos.com',
      ],
    ];

    drupal_add_html_head($meta_og_image, 'meta_og_image');
    drupal_add_html_head($meta_og_title, 'meta_og_title');
    drupal_add_html_head($meta_og_desc, 'meta_og_desc');
    drupal_add_html_head($meta_og_url, 'meta_og_url');
  }
}
