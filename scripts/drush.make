; ----------------
; Generated makefile from http://drushmake.me
; Permanent URL: http://drushmake.me/file.php?token=90a5ec024bd6
; ----------------
;
; This is a working makefile - try it! Any line starting with a `;` is a comment.
  
; Core version
; ------------
; Each makefile should begin by declaring the core version of Drupal that all
; projects should be compatible with. 
  
core = 7.x
  
; API version
; ------------
; Every makefile needs to declare its Drush Make API version. This version of
; drush make uses API version `2`.
  
api = 2
  
; Core project
; ------------
; In order for your makefile to generate a full Drupal site, you must include
; a core project. This is usually Drupal core, but you can also specify
; alternative core projects like Pressflow. Note that makefiles included with
; install profiles *should not* include a core project.
  
; Drupal 7.x. Requires the `core` property to be set to 7.x.
projects[drupal][version] = 7.84

  
  
; Modules
; --------

projects[addtoany][version] = 4.16

projects[admin][version] = 2.0-beta3

projects[admin_menu][version] = 3.0-rc6

projects[advanced_help][version] = 1.6

projects[breakpoints][version] = 1.6

projects[boost][version] = 1.0

projects[breakpoints][version] = 1.6

projects[captcha][version] = 1.3

projects[ckeditor][version] = 1.22

projects[ckeditor_link][version] = 2.4

projects[colorbox][version] = 2.15

projects[context][version] = 3.10

projects[ctools][version] = 1.19

projects[date][version] = 2.12

projects[devel][version] = 1.7

projects[diff][version] = 3.4

projects[email][version] = 1.3

projects[entity][version] = 1.10

projects[facebook_boxes][version] = 1.0

projects[features][version] = 2.13

projects[features_diff][version] = 1.0-beta2

projects[field_collection][version] = 1.2

projects[filefield_sources][version] = 1.11

projects[flexslider][version] = 2.0-rc2

projects[flexslider_views_slideshow][version] = 2.x-dev

projects[google_analytics][version] = 1.4

projects[google_tag][version] = 2.1

projects[honeypot][version] = 1.26

projects[imageapi][version] = 1.x-dev

projects[imce][version] = 1.11

projects[imce_wysiwyg][version] = 1.0

projects[jquery_plugin][version] = 1.0

projects[jquery_update][version] = 2.7

projects[libraries][version] = 2.5

projects[mailsystem][version] = 2.35

projects[metatag][version] = 1.28

projects[mimemail][version] = 1.2

projects[module_filter][version] = 2.2

projects[nice_menus][version] = 3.x-dev

projects[omega_tools][version] = 3.0-rc4

projects[pathauto][version] = 1.3

projects[picture][version] = 2.13

projects[recaptcha][version] = 2.3

projects[references][version] = 2.2

projects[registry_rebuild][version] = 2.5

projects[responsive_menus][version] = 1.7

projects[rules][version] = 2.13

projects[site_map][version] = 1.3

projects[stage_file_proxy][version] = 1.10

projects[strongarm][version] = 2.0

projects[smtp][version] = 1.7

projects[token][version] = 1.8

projects[token_filter][version] = 1.1

projects[10bercart][version] = 3.13

projects[uc_coupon][version] = 2.1-alpha7

projects[views][version] = 3.25

projects[views_bootstrap][version] = 3.5

projects[views_slideshow][version] = 3.10

projects[webform][version] = 4.24

projects[workbench][version] = 1.2

projects[wysiwyg][version] = 2.2

projects[xautoload][version] = 5.8

projects[xmlsitemap][version] = 2.6


; Themes
; --------

projects[omega][version] = 3.1
  
  
; Libraries
; ---------
libraries[jquery][download][type] = "file"
libraries[jquery][download][url] = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"

libraries[jqueryui][download][type] = "file"
libraries[jqueryui][download][url] = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"

libraries[jquery.cycle][download][type] = "file"
libraries[jquery.cycle][download][url] = "http://malsup.github.io/jquery.cycle.all.js"
libraries[jquery.cycle][download][filename] = "jquery.cycle.all.min.js"

libraries[ckeditor][download][type] = get
libraries[ckeditor][download][url] = "http://download.cksource.com/CKEditor/CKEditor/CKEditor%204.5.7/ckeditor_4.5.7_full.zip"
libraries[ckeditor][destination] = libraries
libraries[ckeditor][directory_name] = ckeditor

libraries[colorbox][download][type] = file
libraries[colorbox][download][url] = http://colorpowered.com/colorbox/latest

