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
projects[drupal][version] = 7

  
  
; Modules
; --------
projects[content_access][version] = 1.2-beta1
projects[content_access][type] = "module"
projects[admin][version] = 2.0-beta3
projects[admin][type] = "module"
projects[admin_menu][version] = 3.0-rc3
projects[admin_menu][type] = "module"
projects[module_filter][version] = 1.7
projects[module_filter][type] = "module"
projects[ctools][version] = 1.2
projects[ctools][type] = "module"
projects[context][version] = 3.0-beta6
projects[context][type] = "module"
projects[date][version] = 2.6
projects[date][type] = "module"
projects[devel][version] = 1.3
projects[devel][type] = "module"
projects[features][version] = 1.0
projects[features][type] = "module"
projects[email][version] = 1.2
projects[email][type] = "module"
projects[imce][version] = 1.6
projects[imce][type] = "module"
projects[advanced_help][version] = 1.0
projects[advanced_help][type] = "module"
projects[entity][version] = 1.0
projects[entity][type] = "module"
projects[google_analytics][version] = 1.3
projects[google_analytics][type] = "module"
projects[imageapi][version] = 1.x-dev
projects[imageapi][type] = "module"
projects[jquery_ui][version] = 1.x-dev
projects[jquery_ui][type] = "module"
projects[libraries][version] = 2.0
projects[libraries][type] = "module"
projects[omega][version] = 3.1
projects[omega][type] = "module"
projects[omega_tools][version] = 3.0-rc4
projects[omega_tools][type] = "module"
projects[pathauto][version] = 1.2
projects[pathauto][type] = "module"
projects[service_links][version] = 2.1
projects[service_links][type] = "module"
projects[site_map][version] = 1.0
projects[site_map][type] = "module"
projects[strongarm][version] = 2.0
projects[strongarm][type] = "module"
projects[token][version] = 1.4
projects[token][type] = "module"
projects[imce_wysiwyg][version] = 1.0
projects[imce_wysiwyg][type] = "module"
projects[jquery_plugin][version] = 1.0
projects[jquery_plugin][type] = "module"
projects[jquery_update][version] = 2.2
projects[jquery_update][type] = "module"
projects[wysiwyg][version] = 2.2
projects[wysiwyg][type] = "module"
projects[views][version] = 3.5
projects[views][type] = "module"
projects[webform][version] = 3.18
projects[webform][type] = "module"
projects[xmlsitemap][version] = 2.0-rc2
projects[xmlsitemap][type] = "module"

  

; Themes
; --------

  
  
; Libraries
; ---------
libraries[jquery][download][type] = "file"
libraries[jquery][download][url] = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
libraries[jqueryui][download][type] = "file"
libraries[jqueryui][download][url] = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"
