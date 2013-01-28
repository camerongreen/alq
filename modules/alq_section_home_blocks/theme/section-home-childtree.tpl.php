<div id="section-home-childtree">
<h2><?php echo $title; ?></h2>
<ul>
<?php 
  foreach ($childtree as $sapling) {
    print "<li>" . l(t($sapling["link"]["link_title"]), $sapling["link"]["link_path"]) . "</li>\n";
  }
?>
</ul>
</div>
