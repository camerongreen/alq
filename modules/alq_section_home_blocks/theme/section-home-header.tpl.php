<?php if ($image) { ?>
<div id="section-home-header">
<?php 
  print theme_image_style(array(
    "style_name" => "alq_section_header",
    "path" => $image,
    "height" => NULL,
    "width" => NULL,
  ));
?>
</div>
<?php } ?>
