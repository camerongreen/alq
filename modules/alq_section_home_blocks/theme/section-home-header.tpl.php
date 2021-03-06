<?php

/**
 * @file
 * Show header section.
 */


if ($image) { ?>
    <div id="section-home-header">
      <?php
      if (substr($image, 0, 9) !== "public://") {
        print '<img src="' . $image . '" class="alq_section_header" />';
      }
      else {
        print theme('image_style', [
          "style_name" => "alq_section_header",
          "path" => $image,
          "height" => NULL,
          "width" => NULL,
        ]);
      }
      ?>
    </div>
<?php } ?>
