<?php
/**
 * @file
 * alq_mps_feature.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function alq_mps_feature_user_default_permissions() {
  $permissions = array();

  // Exported permission: access email campaigns.
  $permissions['access email campaigns'] = array(
    'name' => 'access email campaigns',
    'roles' => array(
      '0' => 'anonymous user',
      '1' => 'authenticated user'
    ),
    'module' => 'alq_mps_feature',
  );

  // Exported permission: administer email campaigns.
  $permissions['administer email campaigns'] = array(
    'name' => 'administer email campaigns',
    'roles' => array(
      '0' => 'administrator',
      '1' => 'superuser',
      '2' => 'editor'
    ),
    'module' => 'alq_mps_feature',
  );

  return $permissions;
}
