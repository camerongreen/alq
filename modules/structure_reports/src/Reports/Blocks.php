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
        'name' => $block->title,
        'delta' => $block->delta,
        'status' => $block->status,
        'region' => $block->region,
        'weight' => $block->weight,
        'theme' => $block->theme,
        'module' => $block->module,
        'visibility' => $block->visibility,
        'pages' => json_encode($block->pages),
      ];
    }

    return $rows;
  }

}
