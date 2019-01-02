<?php

/**
 * @file
 * alq_shop.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function alq_shop_taxonomy_default_vocabularies() {
  return array(
    'catalog' => array(
      'name' => 'Product Category',
      'machine_name' => 'catalog',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'uc_catalog',
      'weight' => 0,
      'rdf_mapping' => array(
        'rdftype' => array(
          0 => 'skos:ConceptScheme',
        ),
        'name' => array(
          'predicates' => array(
            0 => 'dc:title',
          ),
        ),
        'description' => array(
          'predicates' => array(
            0 => 'rdfs:comment',
          ),
        ),
      ),
    ),
  );
}
