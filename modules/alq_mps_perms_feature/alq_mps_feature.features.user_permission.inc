<?php
/**
 * @file
 * alq_mps_perms_feature.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function alq_mps_perms_feature_user_default_permissions() {
  $permissions = [];

  // Exported permission: access email campaigns.
  $permissions['access email campaigns'] = [
    'name' => 'access email campaigns',
    'roles' => [
      '0' => 'anonymous user',
      '1' => 'authenticated user'
    ],
    'module' => 'alq_mps',
  ];

  // Exported permission: administer email campaigns.
  $permissions['administer email campaigns'] = [
    'name' => 'administer email campaigns',
    'roles' => [
      '0' => 'administrator',
      '1' => 'superuser',
      '2' => 'editor'
    ],
    'module' => 'alq_mps',
  ];

  return $permissions;
}
