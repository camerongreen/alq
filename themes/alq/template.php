<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 *
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

/**
 * Alter the page
 */
function alq_page_alter($page) {
  global $base_url;

  if (drupal_is_front_page()) {
    $meta_og_image = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => array(
        'property' => 'og:image',
        'content' => $base_url . '/' . drupal_get_path('theme', 'alq') . '/screenshot.jpg'
      )
    );

    drupal_add_html_head($meta_og_image, 'meta_og_image');
  }
}

/**
 * Process variables for search-result.tpl.php.
 *
 * @see search-result.tpl.php
 */
function alq_preprocess_search_result(&$variables) {
  // Remove user name and modification date from search results
  $variables['info'] = '';
}


/**
 * Implements hook_breadcrumb().
 */
function alq_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    $breadcrumb = preg_replace("/Catalog/", "Shop", $breadcrumb); // This line will search and replace text.
    return '<div class="breadcrumb">' . implode(' &raquo; ', $breadcrumb) . '</div>';
  }

}
