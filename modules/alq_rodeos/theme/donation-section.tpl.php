<div class="row">
  <div class="col-sm-5" id="donation-form">
    <h2>Donate</h2>
    <form action="<?= $action ?>">
      <input type="hidden" name="business" value="<?= $business ?>"/>
      <input type="hidden" name="lc" value="AU"/>
      <input type="hidden" name="item_name" value="Animal Liberation Qld"/>
      <input type="hidden" name="no_note" value="1"/>
      <input type="hidden" name="no_shipping" value="1"/>
      <input type="hidden" name="rm" value="1"/>
      <input type="hidden" name="return" value="<?= $redirect_url ?>"/>
      <input type="hidden" name="cancel_return"
             value="<?= $redirect_url_cancel ?>"/>
      <input type="hidden" name="currency_code" value="AUD"/>
      <input type="hidden" name="src" value="1"/>
      <input type="hidden" name="a3" id="a3" value=""/>
      <input type="hidden" name="p3" value="1"/>
      <input type="hidden" name="t3" value="M"/>
      <input type="hidden" name="subject" value="Donation"/>
      <input type="hidden" name="cmd" value="_donations"/>

      <div class="row">
        <div class="col-sm-4">

          <div class="form-group">
            <label for="donation_18"><input type="radio" name="amount"
                                            value="18" id="donation_18"/>
              $18</label>
          </div>
          <div class="form-group">
            <label for="donation_45"><input type="radio" name="amount"
                                            value="45" id="donation_45"/>
              $45</label>
          </div>
          <div class="form-group">
            <label for="donation_100"><input type="radio" name="amount"
                                             value="100" id="donation_100"/>
              $100</label>
          </div>
          <div class="form-group">
            <label for="donation_other"><input type="radio"
                                               name="amount"
                                               value="other"
                                               id="donation_other"/>
              Other</label>
          </div>
        </div>
        <div class="col-sm-8">
          <div>
            Your generous donation will help found our important work
          </div>
          <button type="submit" class="btn btn-default btn-lg">Give now</button>
        </div>
      </div>
    </form>
  </div>
  <div class="col-sm-7">
    <?= $explainer_block ?>
  </div>
</div>
