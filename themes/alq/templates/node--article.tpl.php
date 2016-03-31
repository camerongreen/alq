<article<?php print $attributes; ?>>
  <?php print $user_picture; ?>
  <?php print render($title_prefix); ?>
  <?php if (!$page && $title): ?>
    <header>
      <h2<?php print $title_attributes; ?>><a href="<?php print $node_url ?>"
                                              title="<?php print $title ?>"><?php print $title ?></a>
      </h2>
    </header>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($display_submitted): ?>
    <footer class="submitted"><?php print $date; ?>
      -- <?php print $name; ?></footer>
  <?php endif; ?>

  <div<?php print $content_attributes; ?>>
    <?php
    // We hide the comments, tags and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    hide($content['field_tags']);
    print '<div class="article-date">' . date('j F Y', $node->created) . '</div>';
    if (
      property_exists($node, 'field_thumbnail_only')
      && array_key_exists($node->language, $node->field_thumbnail_only)
      && ($node->field_thumbnail_only[$node->language][0]['value'] === "1")
    ) {
      // hide image if they only want to display as thumbnail
      hide($content['field_image']);
    }
    print render($content);
    ?>
  </div>

  <div class="clearfix">
    <?php print render($content['field_tags']); ?>
  </div>
  <div class="clearfix">
    <?php if (!empty($content['links'])): ?>
      <nav
        class="links node-links clearfix"><?php print render($content['links']); ?></nav>
    <?php endif; ?>

    <?php print render($content['comments']); ?>
  </div>
</article>