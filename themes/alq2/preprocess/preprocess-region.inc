<?php

/**
 * @file
 * The cosmos knows.
 */

/**
 * God knows.
 */
function alq_alpha_preprocess_region(&$vars) {
  $theme = alpha_get_theme();

  if ($vars['elements']['#region'] == 'content') {
    $vars['breadcrumb'] = $theme->page['breadcrumb'];
    $vars['messages'] = $theme->page['messages'];
    $vars['columns'] = $theme->regions['content']['columns'];
  }
}
