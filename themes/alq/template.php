<?php

/**
 * @file
 * Overrides for ALQ theme.
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
function alq_preprocess_html(&$vars) {
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'ui.autocomplete');
  drupal_add_library('system', 'jquery.cookie');

  // Add fonts.
  drupal_add_css('//fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,900;1,400&display=swap', [
    'type' => 'external',
  ]);

  // Add bootstrap and bootstrap flat.
  drupal_add_js(path_to_theme() . '/node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');
  drupal_add_js(path_to_theme() . '/node_modules/bootstrap-sass/assets/javascripts/bootstrap-sprockets.js');

  // Make sure boostrap appears after existing CSS.
  $weight = 200;

  drupal_add_css(path_to_theme() . '/css/bootstrap-flat.min.css', [
    'group' => CSS_THEME,
    'preprocess' => FALSE,
    'weight' => ++$weight,
  ]);
  drupal_add_css(path_to_theme() . '/css/bootstrap-flat-extras.min.css', [
    'group' => CSS_THEME,
    'preprocess' => FALSE,
    'weight' => ++$weight,
  ]);
}

/**
 * Process variables for search-result.tpl.php.
 *
 * @see search-result.tpl.php
 */
function alq_preprocess_search_result(&$variables) {
  // Remove user name and modification date from search results.
  $variables['info'] = '';
}

/**
 * Implements hook_breadcrumb().
 */
function alq_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    // This line will search and replace text.
    $breadcrumb = preg_replace("/Catalog/", "Shop", $breadcrumb);
    return '<div class="breadcrumb">' . implode(' &raquo; ', $breadcrumb) . '</div>';
  }
}

/**
 * Implements theme_menu_link().
 */
function alq_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  if ($element['#title'] === 'Search') {
    $element['#title'] = '<i' . drupal_attributes([
      'class' => [
        'fa',
        'fa-lg',
        'fa-search',
      ],
    ]) . '></i> <span class="sr-only">' . check_plain($element['#title']) . '</span>';

    $element['#localized_options']['html'] = TRUE;
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}
