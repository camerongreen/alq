<a name="donate"></a>
<div class="container">
  <div class="row">
    <div class="col-sm-5">
      <form>
        <label for="donation_18"><input type="radio" name="donation_amount" value="18" id="donation_18" /> $18</label>
        <label for="donation_45"><input type="radio" name="donation_amount" value="45" id="donation_45" /> $45</label>
        <label for="donation_100"><input type="radio" name="donation_amount" value="100" id="donation_100" /> $100</label>
        <label for="donation_other"><input type="radio" name="donation_amount" value="other" id="donation_other" /> Other</label>
        <button type="button">Give now</button>
      </form>
    </div>
    <div class="col-sm-7">
      <?= $explainer_block ?>
    </div>
  </div>
</div>
