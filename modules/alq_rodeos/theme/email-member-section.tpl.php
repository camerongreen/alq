<?= $take_action_block ?>
<div class="row">
  <div class="col-sm-12 col-md-7" id="email-form-section">
    <?= $email_intro_block ?>
    <?= $email_form ?>
  </div>
  <div class="col-sm-12 col-md-5 hidden-xs" id="email-explainer">
    <div class="well">
      <?= $explainer_block ?>
    </div>
  </div>
 <div class="row"> 
    <div id="take-action-images">
      <div class="image-row">
        <div>
          <img
            src="/<?= drupal_get_path('theme', 'rodeos') ?>/images/small-calf-1.jpg"
            alt="Calf roping sequence 1" class='img-thumbnail'/>
        </div>
        <div>
          <img
            src="/<?= drupal_get_path('theme', 'rodeos') ?>/images/small-calf-2.jpg"
            alt="Calf roping sequence 2" class="img-thumbnail"/>
        </div>
        <div>
          <img
            src="/<?= drupal_get_path('theme', 'rodeos') ?>/images/small-calf-3.jpg"
            alt="Calf roping sequence 3" class="img-thumbnail"/>
        </div>
        <div>
          <img
            src="/<?= drupal_get_path('theme', 'rodeos') ?>/images/small-calf-4.jpg"
            alt="Calf roping sequence 4" class="img-thumbnail"/>
        </div>
      </div>
    </div>
  </div>
</div>
