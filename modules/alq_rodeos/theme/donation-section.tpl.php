<a name="donate"></a>
<div class="row">
  <div class="col-sm-5" id="donation-form">
    <h2>Donate</h2>
    <form>
      <div class="row">
        <div class="col-sm-3">

          <div class="form-group">
            <label for="donation_18"><input type="radio" name="donation_amount"
                                            value="18" id="donation_18"/>
              $18</label>
          </div>
          <div class="form-group">
            <label for="donation_45"><input type="radio" name="donation_amount"
                                            value="45" id="donation_45"/>
              $45</label>
          </div>
          <div class="form-group">
            <label for="donation_100"><input type="radio" name="donation_amount"
                                             value="100" id="donation_100"/>
              $100</label>
          </div>
          <div class="form-group">
            <label for="donation_other"><input type="radio"
                                               name="donation_amount"
                                               value="other"
                                               id="donation_other"/>
              Other</label>
          </div>
        </div>
        <div class="col-sm-9">
          <div>
            Your generous donation will help found our important work
          </div>
          <button type="button" class="btn btn-default btn-lg">Give now</button>
        </div>
      </div>
    </form>
  </div>
  <div class="col-sm-7">
    <?= $explainer_block ?>
  </div>
</div>
