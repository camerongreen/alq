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
    'roles' => array(),
    'module' => 'alq_mps',
  );

  // Exported permission: administer email campaigns.
  $permissions['administer email campaigns'] = array(
    'name' => 'administer email campaigns',
    'roles' => array(),
    'module' => 'alq_mps',
  );

  return $permissions;
}
