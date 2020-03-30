# Update log for new theme.

1. Enable, disable modules and sync features.
    drush en -y picture
    drush en -y alq_images_feature
    drush en -y alq_text_formats_feature
    drush features-revert -y alq_menus_feature
    drush pm-disable -y extlink

2. Set omega to fluid width and set scalable by user to true.
    /admin/appearance/settings/alq
    
3. Set the social media block to text format "Straight HTML" and paste this into the contents:

```html
<ul class="social-media">
    <li>
        <a href="https://facebook.com/animalliberationqld" target="_blank" class="btn"><i class="fa fa-lg fa-facebook-official" aria-hidden="true"></i><span class="sr-only">Facebook</span></a>
    </li>
    <li>
        <a href="https://twitter.com/animallibqld" target="_blank" class="btn"><i class="fa fa-lg fa-twitter-square" aria-hidden="true"></i><span class="sr-only">Twitter</span></a>
    </li>
    <li>
        <a href="https://instagram.com/animallibqld" target="_blank" class="btn"><i class="fa fa-lg fa-instagram" aria-hidden="true"></i><span class="sr-only">Instagram</span></a>
    </li>
    <li>
        <a href="/donate" class="btn btn-warning">Donate</a>
    </li>
</ul>
```
    
    

    