<?php

/**
 * @file
 * alq_images_feature.features.inc
 */

/**
 * Implements hook_views_api().
 */
function alq_images_feature_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function alq_images_feature_image_default_styles() {
  $styles = array();

  // Exported image style: alq_page_header.
  $styles['alq_page_header'] = array(
    'label' => 'ALQ Page Header',
    'effects' => array(
      17 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 940,
          'height' => 340,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: alq_section_header.
  $styles['alq_section_header'] = array(
    'label' => 'alq_section_header',
    'effects' => array(
      2 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 940,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: article_style.
  $styles['article_style'] = array(
    'label' => 'article_style',
    'effects' => array(
      3 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 290,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: news_list.
  $styles['news_list'] = array(
    'label' => 'news_list (200x150)',
    'effects' => array(
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 200,
          'height' => 150,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: slideshow.
  $styles['slideshow'] = array(
    'label' => 'slideshow',
    'effects' => array(
      15 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 940,
          'height' => 340,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: vertical_teaser.
  $styles['vertical_teaser'] = array(
    'label' => 'Vertical teaser',
    'effects' => array(
      16 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 300,
          'height' => 200,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}
