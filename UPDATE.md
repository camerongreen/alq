# Update log for new theme.

1. Enable picture module.

2. Set omega to fluid width and set scalable by user to true.
    /admin/appearance/settings/alq
    
3. Sync features:
    drush en -y alq_images_feature
    drush features-revert -y alq_menus_feature
    

    
