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

  // Make sure boostrap appears after existing CSS.
  $weight = 200;

  // Add fonts.
  drupal_add_css('//fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,400&display=swap', [
    'type' => 'external',
    'weight' => $weight,
  ]);

  // Add bootstrap cdn.
  drupal_add_css('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', [
    'type' => 'external',
    'weight' => $weight,
  ]);
  drupal_add_css('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css', [
    'type' => 'external',
    'weight' => $weight + 1,
  ]);
  drupal_add_css(path_to_theme() . '/css/bootstrap-flat.min.css', [
    'weight' => $weight + 1,
  ]);
  drupal_add_css(path_to_theme() . '/css/bootstrap-flat-extras.min.css', [
    'weight' => $weight + 1,
  ]);
  drupal_add_js('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', ['type' => 'external']);
  drupal_add_css('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', ['type' => 'external']);
}

/**
 * Alter the page.
 */
function alq_page_alter($page) {
  global $base_url;

  if (drupal_is_front_page()) {
    $meta_og_image = [
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => [
        'property' => 'og:image',
        'content' => $base_url . '/' . drupal_get_path('theme', 'alq') . '/screenshot.jpg',
      ],
    ];

    drupal_add_html_head($meta_og_image, 'meta_og_image');
  }
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
