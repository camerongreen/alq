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
  $items['alq-export-emailees'] = array(
    'description' => 'Exports emailees in json format.',
    'aliases' => array('alqee'),
  );

  return $items;
}

/**
 * Callback for the export-emails command
 */
function drush_alq_mps_alq_export_emailees() {
  alq_mps_export_emailees();
}