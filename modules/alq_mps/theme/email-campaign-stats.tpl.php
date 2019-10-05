<?php

/**
 * @file
 * Template for displaying campaign stats.
 */
?>
<table>
  <tr>
    <td>Total</td><td><?php echo $sent + $unsent + $errors ?></td>
  </tr>
  <tr>
    <td>Sent</td><td><?php echo $sent ?></td>
  </tr>
  <tr>
    <td>Unsent</td><td><?php echo $unsent ?></td>
  </tr>
  <tr>
    <td>Errors</td><td><?php echo $errors ?></td>
  </tr>
</table>

<div id="graph">
</div>
