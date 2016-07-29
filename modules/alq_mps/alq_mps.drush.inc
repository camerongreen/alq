<?php
/**
 * Created by PhpStorm.
 * User: cameron
 * Date: 26/07/16
 * Time: 9:46 PM
 */

/**
 * Implements hook_drush_command().
 */
function alq_mps_drush_command() {
  $items = [
    'alq-export-emailees' => [
      'description' => 'Exports emailees in stdout in json format, use -v for stats.',
      'aliases' => ['alqeex'],
    ],
    'alq-import-emailees' => [
      'description' => 'Imports emailees from file in json format, use -v for extra info.',
      'aliases' => ['alqeim'],
      'arguments' => [
        'file' => 'The json formatted file containing emailees',
      ],
    ],
  ];

  return $items;
}

/**
 * Callback for the export-emails command
 */
function drush_alq_mps_alq_export_emailees() {
  alq_mps_export_emailees();
}

/**
 * Callback for the import-emails command
 */
function drush_alq_mps_alq_import_emailees($file) {
  alq_mps_import_emailees($file);
}
