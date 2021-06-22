<?php

/**
 * @file
 * alq_mps_feature.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function alq_mps_feature_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_emailee';
  $strongarm->value = 0;
  $export['comment_anonymous_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_email_campaign';
  $strongarm->value = 0;
  $export['comment_anonymous_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_emailee';
  $strongarm->value = 1;
  $export['comment_default_mode_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_email_campaign';
  $strongarm->value = 1;
  $export['comment_default_mode_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_emailee';
  $strongarm->value = '50';
  $export['comment_default_per_page_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_email_campaign';
  $strongarm->value = '50';
  $export['comment_default_per_page_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_emailee';
  $strongarm->value = '1';
  $export['comment_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_email_campaign';
  $strongarm->value = '1';
  $export['comment_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_emailee';
  $strongarm->value = 1;
  $export['comment_form_location_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_email_campaign';
  $strongarm->value = 1;
  $export['comment_form_location_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_emailee';
  $strongarm->value = '1';
  $export['comment_preview_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_email_campaign';
  $strongarm->value = '1';
  $export['comment_preview_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_emailee';
  $strongarm->value = 1;
  $export['comment_subject_field_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_email_campaign';
  $strongarm->value = 1;
  $export['comment_subject_field_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__emailee';
  $strongarm->value = array(
    'extra_fields' => array(
      'display' => array(),
      'form' => array(
        'metatags' => array(
          'weight' => '3',
        ),
        'path' => array(
          'weight' => '1',
        ),
        'title' => array(
          'weight' => '0',
        ),
        'xmlsitemap' => array(
          'weight' => '2',
        ),
      ),
    ),
    'view_modes' => array(),
  );
  $export['field_bundle_settings_node__emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__email_campaign';
  $strongarm->value = array(
    'extra_fields' => array(
      'display' => array(),
      'form' => array(
        'metatags' => array(
          'weight' => '5',
        ),
        'path' => array(
          'weight' => '3',
        ),
        'title' => array(
          'weight' => '0',
        ),
        'xmlsitemap' => array(
          'weight' => '4',
        ),
      ),
    ),
    'view_modes' => array(
      'diff_standard' => array(
        'custom_settings' => FALSE,
      ),
      'full' => array(
        'custom_settings' => FALSE,
      ),
      'rss' => array(
        'custom_settings' => FALSE,
      ),
      'search_index' => array(
        'custom_settings' => FALSE,
      ),
      'search_result' => array(
        'custom_settings' => FALSE,
      ),
      'teaser' => array(
        'custom_settings' => TRUE,
      ),
      'token' => array(
        'custom_settings' => FALSE,
      ),
    ),
  );
  $export['field_bundle_settings_node__email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_emailee';
  $strongarm->value = array();
  $export['menu_options_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_email_campaign';
  $strongarm->value = array();
  $export['menu_options_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_emailee';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_email_campaign';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_emailee';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_email_campaign';
  $strongarm->value = array();
  $export['node_options_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_emailee';
  $strongarm->value = '0';
  $export['node_preview_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_email_campaign';
  $strongarm->value = '1';
  $export['node_preview_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_emailee';
  $strongarm->value = 0;
  $export['node_submitted_emailee'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_email_campaign';
  $strongarm->value = 0;
  $export['node_submitted_email_campaign'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_emailee_pattern';
  $strongarm->value = '';
  $export['pathauto_node_emailee_pattern'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_email_campaign_pattern';
  $strongarm->value = '';
  $export['pathauto_node_email_campaign_pattern'] = $strongarm;

  return $export;
}
