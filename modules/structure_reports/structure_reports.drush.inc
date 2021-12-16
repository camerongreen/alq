<?php

/**
 * @file
 * Structure reports module.
 *
 * This module reports on various aspects of site structure.
 */

use Drupal\structure_reports\Reports\Blocks;

/**
 * Implements hook_drush_command().
 */
function structure_reports_drush_command() {
  $items = [
    'structure-reports-blocks' => [
      'description' => 'Show active blocks on the site.',
      'aliases' => ['srbl'],
      'options' => [
        'status' => '1 for enabled, 0 for disabled, default is to list all',
      ],
      'outputformat' => [
        'default' => 'table',
        'csv' => 'Output CSV format',
      ],
    ],
  ];

  return $items;
}

/**
 * Callback for the structure-reports-blocks command.
 */
function drush_structure_reports_blocks() {
  $blocks = Blocks::report(drush_get_option('status', NULL));

  if (drush_get_option('format', FALSE) === 'csv') {
    if (count($blocks)) {
      $headers = array_keys($blocks[0]);
      array_unshift($blocks, $headers);
    }
  }

  return $blocks;
}
