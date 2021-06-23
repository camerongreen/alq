<?php

/**
 * @file
 * Bootstrap form.
 *
 * This is all kind of lame, recreating the form display, but it's the only
 * way I could easily bootstrapise the form.
 *
 * This code is no longer used.
 *
 * If a better way appears, it should replace this.
 */

// Order of the fields for the form.
$fields = [
  'emailee_name',
  'emailee_electorate',
  'emailee_position',
  'subject',
  'body',
  'email',
  'name',
  'address',
  'state',
  'postcode',
  'country',
  'spam',
  'captcha',
  'submit',
];

// Suburb appears in a different order according to whether it is used
// for search (where the person needs to find their mp) or if there is a static
// mp and we just want the person to enter it.
$suburbSearch = in_array('suburb-search', $form['suburb']['#attributes']['class']);

if ($suburbSearch) {
  array_unshift($fields, 'suburb_help');
  array_unshift($fields, 'suburb_default');
  array_unshift($fields, 'suburb');
}
else {
  array_splice($fields, 8, 0, 'suburb');
}

// This is all pretty nuts, but I wanted to use bootstrap for the form and this
// was the best way I could think of doing it.
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
                              type="checkbox" <?php echo array_key_exists('checked', $ff['#attributes']) && $ff['#attributes']['checked'] ? 'checked="checked" ' : '' ?>
                              id="<?php echo $ff['#id'] ?>"
                              name="<?php echo $ff['#name'] ?>"
                              value="1"><?php echo $ff['#title'] ?></label>
              </div>
          </div>
      <?php }
      elseif (in_array($ff['#type'], ['captcha', 'markup'])) {
        ?>
          <div class="col-sm-offset-3 col-sm-9 <?php echo $ff['#type'] ?>">
            <?php echo render($ff) ?>
          </div>
        <?php
      }
      elseif ($ff['#type'] === 'submit') {
        ?>
          <div class="col-sm-offset-3 col-sm-9">
              <button class="btn btn-primary" type="submit"
                      id="<?php echo $ff['#id'] ?>"
                      name="<?php echo $ff['#name'] ?>">
                <?php echo $ff['#value'] ?>
              </button>
          </div>
      <?php }
      else { ?>
          <label for="<?php echo $ff['#id'] ?>"
                 class="col-sm-3"><?php echo $ff['#title'] ?><?php echo $ff['#required'] ? '<span class="form-required" title="This field is required.">*</span>' : '' ?></label>
          <div class="col-sm-9">
            <?php
            if ($ff['#type'] === 'textfield') {
              ?>
                <input
                  <?php echo $field === 'suburb' ? 'autocomplete="off" ' : '' ?><?php echo array_key_exists('readonly', $ff['#attributes']) && $ff['#attributes']['readonly'] ? 'readonly="readonly" ' : '' ?><?php echo array_key_exists('placeholder', $ff['#attributes']) && $ff['#attributes']['placeholder'] ? ' placeholder="' . $ff['#attributes']['placeholder'] . '"' : '' ?>
                        class="<?php echo implode(' ', $ff['#attributes']['class']) ?> form-text<?php echo $ff['#required'] ? ' required' : '' ?><?php print form_get_error($ff) ? ' error' : '' ?>"
                        type="text"
                  <?php echo $ff['#required'] ? 'required="required"' : '' ?>
                        id="<?php echo $ff['#id'] ?>"
                        name="<?php echo $ff['#name'] ?>"
                        value="<?php echo $ff['#value'] ?>"><span
                        role="status" aria-live="polite"
                        class="ui-helper-hidden-accessible"></span>
              <?php
            }
            elseif ($ff['#type'] === 'textarea') {
              ?>
                <div
                        class="form-textarea-wrapper resizable textarea-processed resizable-textarea">
            <textarea
                    class="<?php echo implode(' ', $ff['#attributes']['class']) ?> form-textarea<?php echo $ff['#required'] ? ' required' : '' ?>"
                    id="<?php echo $ff['#id'] ?>"
                    name="<?php echo $ff['#name'] ?>"
                    cols="60"
                    <?php echo $ff['#required'] ? 'required="required"' : '' ?>
                    rows="10"><?php echo $ff['#value'] ?></textarea>
                </div>
            <?php }
            else {
              $ff['#theme_wrappers'] = [];
              $ff['#title_display'] = 'invisible';
              echo render($ff);
            }
            ?></div><!-- .col-sm-9 --><?php
      } ?>
    </div><!-- ./form-group -->
  <?php

  unset($form[$field]);
}
// Render all the other fields which we haven't specified.
print drupal_render_children($form);
