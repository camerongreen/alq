<?php
/*
 * This is all kind of lame, recreating the form display, but it's the only
 * way I could easily bootstrapise the form
 *
 * If a better way appears, it should replace this
 */

// order of the fields for the form
$fields = [
  'emailee_name',
  'emailee_electorate',
  'emailee_position',
  'subject',
  'body',
  'email',
  'name',
  'spam',
  'captcha',
  'submit',
];

// suburb appears in a different order according to whether it is used
// for search (where the person needs to find their mp) or if there is a static
// mp and we just want the person to enter it

$suburbSearch = in_array('suburb-search', $form['suburb']['#attributes']['class']);

if ($suburbSearch) {
  array_unshift($fields, 'suburb_help');
  array_unshift($fields, 'suburb_default');
  array_unshift($fields, 'suburb');
}
else {
  array_splice($fields, 7, 0, 'suburb');
}

// this is all pretty nuts, but I wanted to use bootstrap for the form and this
// was the best way I could think of doing it
foreach ($fields as $field) {
  if (!isset($form[$field])) {
    continue;
  }
  $ff = $form[$field];
  ?>
  <div class="form-group form-item">
    <?php
    if ($ff['#type'] === 'checkbox') {
      ?>
      <div class="col-sm-offset-3 col-sm-9">
        <div class="checkbox">
          <label><input
              class="form-checkbox<?php form_get_error($form[$field]) ? ' error' : '' ?>"
              type="checkbox" <?= array_key_exists('checked', $ff['#attributes']) && $ff['#attributes']['checked'] ? 'checked="checked" ' : '' ?>
              id="<?= $ff['#id'] ?>" name="<?= $ff['#name'] ?>"
              value="1"><?= $ff['#title'] ?></label>
        </div>
      </div>
    <?php }
    else if (in_array($ff['#type'], ['captcha', 'markup'])) {
      ?>
      <div class="col-sm-offset-3 col-sm-9 <?= $ff['#type'] ?>">
        <?= render($ff) ?>
      </div>
      <?php
    }
    else if ($ff['#type'] === 'submit') {
      ?>
      <div class="col-sm-offset-3 col-sm-9">
        <button class="btn btn-primary" type="submit" id="<?= $ff['#id'] ?>"
                name="<?= $ff['#name'] ?>">
          <?= $ff['#value'] ?>
        </button>
      </div>
    <?php }
    else { ?>
      <label for="<?= $ff['#id'] ?>"
             class="col-sm-3"><?= $ff['#title'] ?><?= $ff['#required'] ? '<span class="form-required" title="This field is required.">*</span>' : '' ?></label>
      <div class="col-sm-9">
        <?php
        if ($ff['#type'] === 'textfield') {
          ?>
          <input
            <?= $field === 'suburb' ? 'autocomplete="off" ' : '' ?><?= array_key_exists('readonly', $ff['#attributes']) && $ff['#attributes']['readonly'] ? 'readonly="readonly" ' : '' ?><?= array_key_exists('placeholder', $ff['#attributes']) && $ff['#attributes']['placeholder'] ? ' placeholder="' . $ff['#attributes']['placeholder'] . '"' : '' ?>
            class="<?= implode(' ', $ff['#attributes']['class']) ?> form-text<?= $ff['#required'] ? ' required' : '' ?><?php print form_get_error($ff) ? ' error' : '' ?>"
            type="text"
            id="<?= $ff['#id'] ?>" name="<?= $ff['#name'] ?>"
            value="<?= $ff['#value'] ?>"><span
            role="status" aria-live="polite"
            class="ui-helper-hidden-accessible"></span>
          <?php
        }
        else if ($ff['#type'] === 'textarea') {
          ?>
          <div
            class="form-textarea-wrapper resizable textarea-processed resizable-textarea">
            <textarea
              class="<?= implode(' ', $ff['#attributes']['class']) ?> form-textarea required"
              id="<?= $ff['#id'] ?>" name="<?= $ff['#name'] ?>"
              cols="60"
              rows="5"><?= $ff['#value'] ?></textarea>
          </div>
        <?php }
        ?></div><!-- .col-sm-9 --><?php
    } ?>
  </div><!-- ./form-group -->
  <?php

  unset($form[$field]);
}
// render all the other fields which we haven't specified
print drupal_render_children($form);