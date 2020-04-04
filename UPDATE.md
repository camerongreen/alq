# Update log for new theme.

1. Enable, disable modules and sync features.
    drush en -y views_bootstrap
    drush en -y picture
    drush en -y alq_images_feature
    drush en -y alq_text_formats_feature
    drush features-revert-all -y

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
   Change the input class to "form-control" and the button class to "btn btn-default"'


6. Set all blocks in sidebar first to not display. Remove user menu block.

7. Change donate block text format to Straight HTML and contents to this:

```html
<div class="donate-block">
  <img src="/sites/all/themes/custom/alq/images/pig-on-white-background.jpg" alt="" />
  <div class="text">
    <p>We rely on your generous donations to fund our vital work. Please <a href="/content/donate">Donate Now</a>.</p>
    <p><a href="/content/donate" class="btn btn-lg btn-warning">Donate Now</a></p>
  </div>
<div>
```

8. Remove P tags from copyright block and change to straight html.

9. Move Node image header block to under section home in Header first region. Should only display on:
  Article
  Basic page
  Email campaign
  Media article
    
10. Create a new block to go under mail chimp signup form in content region.
title: <none>
description: Front page shop
Display only on front

```html
<div class="jumbotron">
  <div class="container">
      <h1>ALQ Shop</h1>
      <div class="text">
        <p>Looking for the perfect gift for the animal lover in your life, or just treating yourself?</p>
        hopp>The ALQ shop has you covered.</p>
        <p><a class="btn btn-primary btn-lg" href="/shop" role="button">View shop</a></p>
      </div>
  </div>
</div>
```

11. Delete old menu link -> Media -> in the news.
