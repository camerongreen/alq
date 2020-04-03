# Update log for new theme.

1. Enable, disable modules and sync features.
    drush en -y picture
    drush en -y alq_images_feature
    drush en -y alq_text_formats_feature
    drush features-revert -y alq_menus_feature
    drush pm-disable -y extlink

2. Disable formalize library in theme.
    /admin/appearance/settings/alq
    
3. Set the social media block to text format "Straight HTML" and paste this into the contents:

```html
<ul class="social-media">
    <li>
        <a href="/search" class="btn menu-path-search"><i class="fa fa-lg fa-search" aria-hidden="true"></i><span class="sr-only">Search</span></a>
    </li>
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
    
4. Move search block to be bottom of Menu zone.  Show on all pages and content types.

5. Move mail chimp signup block to content zone under news.  Show only on <front> page, but on all content types.

6. Set all blocks in sidebar first to not display.

7. Change donate block text format to Straight HTML and contents to this:

```html
<p>We rely on your generous donations to fund our vital work. Please <a href="/content/donate">donate now</a>.</p>
<p><a href="/content/donate" class="btn btn-lg btn-warning">Donate Now</a></p>
```

8. Remove P tags from copyright block and change to straight html.

9. Move Node image header block to under section home block.
    
    
