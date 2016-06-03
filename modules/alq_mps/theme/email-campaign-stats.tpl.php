<table>
  <tr>
    <td>Total</td><td><?= $sent + $unsent + $errors ?></td>
  </tr>
  <tr>
    <td>Sent</td><td><?= $sent ?></td>
  </tr>
  <tr>
    <td>Unsent</td><td><?= $unsent ?></td>
  </tr>
  <tr>
    <td>Errors</td><td><?= $errors ?></td>
  </tr>
</table>

<div id="graph">
</div>