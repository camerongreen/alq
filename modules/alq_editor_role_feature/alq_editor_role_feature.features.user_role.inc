<?php
/**
 * @file
 * alq_editor_role_feature.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function alq_editor_role_feature_user_default_roles() {
  $roles = array();

  // Exported role: editor.
  $roles['editor'] = array(
    'name' => 'editor',
    'weight' => '3',
  );

  return $roles;
}
