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
 * implements hook_preprocess_html
 *
 * @param $vars
 */
function rodeos_preprocess_html(&$vars) {
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'ui.autocomplete');

  // make sure boostrap appears after formalize
  $weight = 200;

// Add bootstrap cdn.
  drupal_add_css('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', ['type' => 'external', 'weight' => $weight]);
  drupal_add_css('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css', ['type' => 'external', 'weight' => $weight + 1]);
  drupal_add_js('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js', ['type' => 'external']);
  drupal_add_css('//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css', ['type' => 'external']);

// add fonts we will use
  drupal_add_css('//fonts.googleapis.com/css?family=Hind|Open Sans', ['type' => 'external']);

// and out script we'll do tricky things with
  drupal_add_js(path_to_theme() . '/js/rodeos.js');
}

/**
 * Alter the page
 */
function rodeos_page_alter($page) {
  global $base_url;

  if (drupal_is_front_page()) {
    $meta_og_image = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => array(
        'property' => 'og:image',
        'content' => $base_url . '/' . drupal_get_path('theme', 'rodeos') . '/images/share_image.png'
      )
    );

    $meta_og_title = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => array(
        'property' => 'og:title',
        'content' => 'RethinkRodeos.com'
      )
    );

    $meta_og_desc = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => array(
        'property' => 'og:description',
        'content' => 'Grown men causing fear, stress and pain to calves all in the name of entertainment is simply wrong. Please help stop this bullying of baby animals.'
      )
    );

    $meta_og_url = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => array(
        'property' => 'og:url',
        'content' => 'rethinkrodeos.com'
      )
    );

    drupal_add_html_head($meta_og_image, 'meta_og_image');
    drupal_add_html_head($meta_og_title, 'meta_og_title');
    drupal_add_html_head($meta_og_desc, 'meta_og_desc');
    drupal_add_html_head($meta_og_url, 'meta_og_url');
  }
}
