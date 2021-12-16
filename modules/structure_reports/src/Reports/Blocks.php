<?php

namespace Drupal\structure_reports\Reports;

/**
 * Reports on blocks for site.
 */
class Blocks {

  /**
   * Run audit of blocks on site.
   *
   * @param int $status
   *   Filters by the block status.
   *
   * @return array
   *   Array of information about blocks on the site.
   */
  public static function report(int $status = NULL): array {

    $query = db_select('block', 'b')
      ->fields('b')
      ->orderBy('module')
      ->orderBy('theme')
      ->orderBy('delta');

    if (!is_null($status)) {
      $query->condition('status', $status);
    }

    $result = $query->execute()
      ->fetchAll();

    $rows = [];

    foreach ($result as $block) {
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
