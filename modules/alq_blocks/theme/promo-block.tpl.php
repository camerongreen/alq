<?php

/**
 * @file
 * Show promo, no....
 */

$file = file_load($image);
$image_url = file_create_url($file->uri);

$text_classes = [
  'text',
  $alignment,
  $background,
];

?>
<div class="jumbotron" style="background-image: url(<?php print $image_url ?>)">
    <div class="container">
        <div class="<?php print implode(' ', $text_classes) ?>">
          <?php print $text['value'] ?>
            <p><a class="btn btn-<?php print $button_type; ?> btn-lg"
                  href="<?php print $button_url ?>"
                  role="button"><?php print $button_text ?></a></p>
        </div>
    </div>
</div>
