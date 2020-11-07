<?php

/**
 * @file
 * alq_menus_feature.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function alq_menus_feature_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: menu-footer-menu_contact-us:contact.
  $menu_links['menu-footer-menu_contact-us:contact'] = array(
    'menu_name' => 'menu-footer-menu',
    'link_path' => 'contact',
    'router_path' => 'contact',
    'link_title' => 'Contact Us',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-menu_contact-us:contact',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 1,
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-menu_donate:node/478.
  $menu_links['menu-footer-menu_donate:node/478'] = array(
    'menu_name' => 'menu-footer-menu',
    'link_path' => 'node/478',
    'router_path' => 'node/%',
    'link_title' => 'Donate',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-menu_donate:node/478',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 1,
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-menu_latest-updates:news.
  $menu_links['menu-footer-menu_latest-updates:news'] = array(
    'menu_name' => 'menu-footer-menu',
    'link_path' => 'news',
    'router_path' => 'news',
    'link_title' => 'Latest Updates',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-menu_latest-updates:news',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-menu_privacy-policy:node/195.
  $menu_links['menu-footer-menu_privacy-policy:node/195'] = array(
    'menu_name' => 'menu-footer-menu',
    'link_path' => 'node/195',
    'router_path' => 'node/%',
    'link_title' => 'Privacy Policy',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'menu-footer-menu_privacy-policy:node/195',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-menu_sitemap:sitemap.
  $menu_links['menu-footer-menu_sitemap:sitemap'] = array(
    'menu_name' => 'menu-footer-menu',
    'link_path' => 'sitemap',
    'router_path' => 'sitemap',
    'link_title' => 'Sitemap',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-menu_sitemap:sitemap',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_about-us-main:node/110.
  $menu_links['menu-header-menu_about-us-main:node/110'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/110',
    'router_path' => 'node/%',
    'link_title' => 'About Us main',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_about-us-main:node/110',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_about-us:node/110',
  );
  // Exported menu link: menu-header-menu_about-us:node/110.
  $menu_links['menu-header-menu_about-us:node/110'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/110',
    'router_path' => 'node/%',
    'link_title' => 'About Us',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'menu-header-menu_about-us:node/110',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 1,
    'weight' => -50,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_alq-in-the-news:in-the-news.
  $menu_links['menu-header-menu_alq-in-the-news:in-the-news'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'in-the-news',
    'router_path' => 'in-the-news',
    'link_title' => 'ALQ in the news',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_alq-in-the-news:in-the-news',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_media:node/196',
  );
  // Exported menu link: menu-header-menu_animal-experiments:node/460.
  $menu_links['menu-header-menu_animal-experiments:node/460'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/460',
    'router_path' => 'node/%',
    'link_title' => 'Animal Experiments',
    'options' => array(
      'identifier' => 'menu-header-menu_animal-experiments:node/460',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -43,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_become-a-regular-giver:node/479.
  $menu_links['menu-header-menu_become-a-regular-giver:node/479'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/479',
    'router_path' => 'node/%',
    'link_title' => 'Become a regular giver',
    'options' => array(
      'identifier' => 'menu-header-menu_become-a-regular-giver:node/479',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_get-involved:node/115',
  );
  // Exported menu link: menu-header-menu_brisbane-animal-save:node/414.
  $menu_links['menu-header-menu_brisbane-animal-save:node/414'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/414',
    'router_path' => 'node/%',
    'link_title' => 'Brisbane Animal Save',
    'options' => array(
      'identifier' => 'menu-header-menu_brisbane-animal-save:node/414',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_broiler-chickens:node/243.
  $menu_links['menu-header-menu_broiler-chickens:node/243'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/243',
    'router_path' => 'node/%',
    'link_title' => 'Broiler Chickens',
    'options' => array(
      'identifier' => 'menu-header-menu_broiler-chickens:node/243',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'menu-header-menu_factsheets:node/112',
  );
  // Exported menu link: menu-header-menu_campaigns-main:node/111.
  $menu_links['menu-header-menu_campaigns-main:node/111'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/111',
    'router_path' => 'node/%',
    'link_title' => 'Campaigns main',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_campaigns-main:node/111',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_campaigns:node/111.
  $menu_links['menu-header-menu_campaigns:node/111'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/111',
    'router_path' => 'node/%',
    'link_title' => 'Campaigns',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'menu-header-menu_campaigns:node/111',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 1,
    'weight' => -49,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_chicken-hatching:node/127.
  $menu_links['menu-header-menu_chicken-hatching:node/127'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/127',
    'router_path' => 'node/%',
    'link_title' => 'Chicken Hatching',
    'options' => array(
      'identifier' => 'menu-header-menu_chicken-hatching:node/127',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -40,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_circuses:node/95.
  $menu_links['menu-header-menu_circuses:node/95'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/95',
    'router_path' => 'node/%',
    'link_title' => 'Circuses',
    'options' => array(
      'identifier' => 'menu-header-menu_circuses:node/95',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -41,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_companion-animals:node/246.
  $menu_links['menu-header-menu_companion-animals:node/246'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/246',
    'router_path' => 'node/%',
    'link_title' => 'Companion Animals',
    'options' => array(
      'identifier' => 'menu-header-menu_companion-animals:node/246',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'menu-header-menu_factsheets:node/112',
  );
  // Exported menu link: menu-header-menu_contact-us:contact.
  $menu_links['menu-header-menu_contact-us:contact'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'contact',
    'router_path' => 'contact',
    'link_title' => 'Contact Us',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_contact-us:contact',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 1,
    'weight' => -49,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_about-us:node/110',
  );
  // Exported menu link: menu-header-menu_dairy:node/129.
  $menu_links['menu-header-menu_dairy:node/129'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/129',
    'router_path' => 'node/%',
    'link_title' => 'Dairy',
    'options' => array(
      'identifier' => 'menu-header-menu_dairy:node/129',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -42,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_donate:node/478.
  $menu_links['menu-header-menu_donate:node/478'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/478',
    'router_path' => 'node/%',
    'link_title' => 'Donate',
    'options' => array(
      'identifier' => 'menu-header-menu_donate:node/478',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_get-involved:node/115',
  );
  // Exported menu link: menu-header-menu_eggs:node/244.
  $menu_links['menu-header-menu_eggs:node/244'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/244',
    'router_path' => 'node/%',
    'link_title' => 'Eggs',
    'options' => array(
      'identifier' => 'menu-header-menu_eggs:node/244',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'menu-header-menu_factsheets:node/112',
  );
  // Exported menu link: menu-header-menu_factory-farming:node/88.
  $menu_links['menu-header-menu_factory-farming:node/88'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/88',
    'router_path' => 'node/%',
    'link_title' => 'Factory Farming',
    'options' => array(
      'identifier' => 'menu-header-menu_factory-farming:node/88',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_factsheets:node/112.
  $menu_links['menu-header-menu_factsheets:node/112'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/112',
    'router_path' => 'node/%',
    'link_title' => 'Factsheets',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'menu-header-menu_factsheets:node/112',
    ),
    'module' => 'menu',
    'hidden' => 1,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 1,
    'weight' => -46,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_feedlots:node/126.
  $menu_links['menu-header-menu_feedlots:node/126'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/126',
    'router_path' => 'node/%',
    'link_title' => 'Feedlots',
    'options' => array(
      'identifier' => 'menu-header-menu_feedlots:node/126',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'menu-header-menu_factsheets:node/112',
  );
  // Exported menu link: menu-header-menu_flying-foxes:node/128.
  $menu_links['menu-header-menu_flying-foxes:node/128'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/128',
    'router_path' => 'node/%',
    'link_title' => 'Flying Foxes',
    'options' => array(
      'identifier' => 'menu-header-menu_flying-foxes:node/128',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'menu-header-menu_factsheets:node/112',
  );
  // Exported menu link: menu-header-menu_frequently-asked-questions:node/123.
  $menu_links['menu-header-menu_frequently-asked-questions:node/123'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/123',
    'router_path' => 'node/%',
    'link_title' => 'Frequently Asked Questions',
    'options' => array(
      'identifier' => 'menu-header-menu_frequently-asked-questions:node/123',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_about-us:node/110',
  );
  // Exported menu link: menu-header-menu_get-involved-main:node/115.
  $menu_links['menu-header-menu_get-involved-main:node/115'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/115',
    'router_path' => 'node/%',
    'link_title' => 'Get Involved main',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_get-involved-main:node/115',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_get-involved:node/115',
  );
  // Exported menu link: menu-header-menu_get-involved:node/115.
  $menu_links['menu-header-menu_get-involved:node/115'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/115',
    'router_path' => 'node/%',
    'link_title' => 'Get Involved',
    'options' => array(
      'identifier' => 'menu-header-menu_get-involved:node/115',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_greyhound-racing:node/125.
  $menu_links['menu-header-menu_greyhound-racing:node/125'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/125',
    'router_path' => 'node/%',
    'link_title' => 'Greyhound Racing',
    'options' => array(
      'identifier' => 'menu-header-menu_greyhound-racing:node/125',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -45,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_home:<front>.
  $menu_links['menu-header-menu_home:<front>'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => '<front>',
    'router_path' => '',
    'link_title' => 'Home',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_home:<front>',
    ),
    'module' => 'menu',
    'hidden' => 1,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_join-our-mailing-list:node/413.
  $menu_links['menu-header-menu_join-our-mailing-list:node/413'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/413',
    'router_path' => 'node/%',
    'link_title' => 'Join our Mailing List',
    'options' => array(
      'identifier' => 'menu-header-menu_join-our-mailing-list:node/413',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_get-involved:node/115',
  );
  // Exported menu link: menu-header-menu_media-main:node/196.
  $menu_links['menu-header-menu_media-main:node/196'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/196',
    'router_path' => 'node/%',
    'link_title' => 'Media main',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_media-main:node/196',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_media:node/196',
  );
  // Exported menu link: menu-header-menu_media-releases:media-releases.
  $menu_links['menu-header-menu_media-releases:media-releases'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'media-releases',
    'router_path' => 'media-releases',
    'link_title' => 'Media Releases',
    'options' => array(
      'identifier' => 'menu-header-menu_media-releases:media-releases',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_media:node/196',
  );
  // Exported menu link: menu-header-menu_media:node/196.
  $menu_links['menu-header-menu_media:node/196'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/196',
    'router_path' => 'node/%',
    'link_title' => 'Media',
    'options' => array(
      'identifier' => 'menu-header-menu_media:node/196',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
  );
  // Exported menu link: menu-header-menu_our-office:node/119.
  $menu_links['menu-header-menu_our-office:node/119'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/119',
    'router_path' => 'node/%',
    'link_title' => 'Our office',
    'options' => array(
      'identifier' => 'menu-header-menu_our-office:node/119',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_about-us:node/110',
  );
  // Exported menu link: menu-header-menu_petting-zoos:node/484.
  $menu_links['menu-header-menu_petting-zoos:node/484'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/484',
    'router_path' => 'node/%',
    'link_title' => 'Petting Zoos',
    'options' => array(
      'identifier' => 'menu-header-menu_petting-zoos:node/484',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -39,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_pigs:node/245.
  $menu_links['menu-header-menu_pigs:node/245'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/245',
    'router_path' => 'node/%',
    'link_title' => 'Pigs',
    'options' => array(
      'identifier' => 'menu-header-menu_pigs:node/245',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'menu-header-menu_factsheets:node/112',
  );
  // Exported menu link: menu-header-menu_rodeos:node/100.
  $menu_links['menu-header-menu_rodeos:node/100'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/100',
    'router_path' => 'node/%',
    'link_title' => 'Rodeos',
    'options' => array(
      'identifier' => 'menu-header-menu_rodeos:node/100',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_search:search.
  $menu_links['menu-header-menu_search:search'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'search',
    'router_path' => 'search',
    'link_title' => 'Search',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_search:search',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 10,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_shop:catalog.
  $menu_links['menu-header-menu_shop:catalog'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'catalog',
    'router_path' => 'catalog',
    'link_title' => 'Shop',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-header-menu_shop:catalog',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 1,
    'weight' => -48,
    'customized' => 1,
  );
  // Exported menu link: menu-header-menu_veganism:node/124.
  $menu_links['menu-header-menu_veganism:node/124'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/124',
    'router_path' => 'node/%',
    'link_title' => 'Veganism',
    'options' => array(
      'identifier' => 'menu-header-menu_veganism:node/124',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_campaigns:node/111',
  );
  // Exported menu link: menu-header-menu_volunteer:node/116.
  $menu_links['menu-header-menu_volunteer:node/116'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/116',
    'router_path' => 'node/%',
    'link_title' => 'Volunteer',
    'options' => array(
      'identifier' => 'menu-header-menu_volunteer:node/116',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_get-involved:node/115',
  );
  // Exported menu link: menu-header-menu_willsbequests:node/392.
  $menu_links['menu-header-menu_willsbequests:node/392'] = array(
    'menu_name' => 'menu-header-menu',
    'link_path' => 'node/392',
    'router_path' => 'node/%',
    'link_title' => 'Wills/Bequests',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'menu-header-menu_willsbequests:node/392',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -45,
    'customized' => 1,
    'parent_identifier' => 'menu-header-menu_get-involved:node/115',
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('ALQ in the news');
  t('About Us');
  t('About Us main');
  t('Animal Experiments');
  t('Become a regular giver');
  t('Brisbane Animal Save');
  t('Broiler Chickens');
  t('Campaigns');
  t('Campaigns main');
  t('Chicken Hatching');
  t('Circuses');
  t('Companion Animals');
  t('Contact Us');
  t('Dairy');
  t('Donate');
  t('Eggs');
  t('Factory Farming');
  t('Factsheets');
  t('Feedlots');
  t('Flying Foxes');
  t('Frequently Asked Questions');
  t('Get Involved');
  t('Get Involved main');
  t('Greyhound Racing');
  t('Home');
  t('Join our Mailing List');
  t('Latest Updates');
  t('Media');
  t('Media Releases');
  t('Media main');
  t('Our office');
  t('Petting Zoos');
  t('Pigs');
  t('Privacy Policy');
  t('Rodeos');
  t('Search');
  t('Shop');
  t('Sitemap');
  t('Veganism');
  t('Volunteer');
  t('Wills/Bequests');

  return $menu_links;
}
