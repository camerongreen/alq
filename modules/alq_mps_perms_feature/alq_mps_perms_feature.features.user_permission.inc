<?php

/**
 * @file
 * alq_mps_perms_feature.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function alq_mps_perms_feature_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'access email campaigns'.
  $permissions['access email campaigns'] = array(
    'name' => 'access email campaigns',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
      'editor' => 'editor',
    ),
    'module' => 'alq_mps',
  );

  // Exported permission: 'administer email campaigns'.
  $permissions['administer email campaigns'] = array(
    'name' => 'administer email campaigns',
    'roles' => array(
      'administrator' => 'administrator',
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'alq_mps',
  );

  // Exported permission: 'create email_campaign content'.
  $permissions['create email_campaign content'] = array(
    'name' => 'create email_campaign content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'create emailee content'.
  $permissions['create emailee content'] = array(
    'name' => 'create emailee content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete any email_campaign content'.
  $permissions['delete any email_campaign content'] = array(
    'name' => 'delete any email_campaign content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete any emailee content'.
  $permissions['delete any emailee content'] = array(
    'name' => 'delete any emailee content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete own email_campaign content'.
  $permissions['delete own email_campaign content'] = array(
    'name' => 'delete own email_campaign content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete own emailee content'.
  $permissions['delete own emailee content'] = array(
    'name' => 'delete own emailee content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit any email_campaign content'.
  $permissions['edit any email_campaign content'] = array(
    'name' => 'edit any email_campaign content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit any emailee content'.
  $permissions['edit any emailee content'] = array(
    'name' => 'edit any emailee content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit own email_campaign content'.
  $permissions['edit own email_campaign content'] = array(
    'name' => 'edit own email_campaign content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit own emailee content'.
  $permissions['edit own emailee content'] = array(
    'name' => 'edit own emailee content',
    'roles' => array(
      'editor' => 'editor',
      'superuser' => 'superuser',
    ),
    'module' => 'node',
  );

  return $permissions;
}
