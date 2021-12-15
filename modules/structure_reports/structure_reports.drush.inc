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
  $blocks = Blocks::report();

  return $blocks;
}
