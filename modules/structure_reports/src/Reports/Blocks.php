<?php

namespace Drupal\structure_reports\Reports;

/**
 * Reports on blocks for site.
 */
class Blocks {

  /**
   * Run audit of blocks on site.
   *
   * @return array
   *   Array of information about blocks on the site.
   */
  public static function report(): array {
    $query = db_select('block', 'b')
      ->fields('b')
      ->orderBy('module')
      ->orderBy('theme')
      ->orderBy('delta')
      ->execute()
      ->fetchAll();

    $rows = [];

    foreach ($query as $block) {
      $rows[] = [
        dt('Title') => $block->title,
        dt('Delta') => $block->delta,
        dt('Status') => $block->status,
        dt('Region') => $block->region,
        dt('Weight') => $block->weight,
        dt('Theme') => $block->theme,
        dt('Module') => $block->module,
        dt('Visibility') => $block->visibility,
        dt('Pages') => json_encode($block->pages),
      ];
    }

    return $rows;
  }

}
