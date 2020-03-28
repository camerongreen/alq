<?php

/**
 * @file
 * Override of Alpha's theme implementation to display a zone.
 *
 * Here we just get rid of all the guff which creates a grid so we can
 * have full width for the slideshow.
 */
?>
<?php if ($wrapper): ?>
<div<?php print $attributes; ?>>
<?php endif; ?>
<?php print $content; ?>
<?php if ($wrapper): ?></div>
<?php endif; ?>
