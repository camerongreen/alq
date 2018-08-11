<h2>ALQ Membership Form</h2>

<form class="form-horizontal" id="membershipForm" method="post"
      action="<?= $action ?>">
  <!-- variables from paypal -->
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
  <input type="hidden" id="t3" name="t3" value="M"/>
  <input type="hidden" name="subject" value="Membership"/>
  <input type="hidden" name="cmd" id="cmd" value="_xclick-subscriptions"/>

  <!-- /variables from paypal -->

  <!-- pass-through variables paypal will send on -->
  <input type="hidden" name="custom" id="custom"/>
  <!-- /pass-through variables paypal will send on -->

  <div class="requiredLegend">
    Required Fields <span>&#x2605;</span>
  </div>

  <div class="form-group" id="title">
    <label for="title" class="col-sm-3">Title</label>

    <div class="col-sm-9">
      <select name="title" class="form-control">
        <option value="">-- Select --</option>
        <option>Ms</option>
        <option>Mrs</option>
        <option>Miss</option>
        <option>Mr</option>
        <option>Dr</option>
        <option>Professor</option>
        <option>Mx</option>
      </select>
    </div>
  </div>

  <div class="form-group required">
    <label for="givenName" class="col-sm-3">Given Name</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="givenName"
             name="givenName" placeholder="Given Name">
    </div>
  </div>

  <div class="form-group required">
    <label for="familyName" class="col-sm-3">Family Name</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="familyName"
             name="familyName"
             placeholder="Family Name">
    </div>
  </div>

  <div class="form-group required">
    <label for="email" class="col-sm-3">Email</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="email" name="email"
             placeholder="Email" />
    </div>
  </div>

  <div class="form-group required">
    <label for="phone" class="col-sm-3">Phone</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="phone" name="phone"
             placeholder="Phone" />
    </div>
  </div>

  <div class="form-group required">
    <label for="address1" class="col-sm-3">Address 1</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="address1"
             name="address1"
             placeholder="Address Line 1"/>
    </div>
  </div>

  <div class="form-group">
    <label for="address2" class="col-sm-3">Address 2</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="address2"
             name="address2"
             placeholder="Address Line 2"/>
    </div>
  </div>

  <div class="form-group required">
    <label for="town" class="col-sm-3">Suburb/Town</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="suburb" name="suburb"
             placeholder="Suburb/Town"/>
    </div>
  </div>

  <div class="form-group required">
    <label for="postcode" class="col-sm-3">Postcode</label>

    <div class="col-sm-9">
      <input type="text" class="form-control" id="postcode"
             name="postcode"
             placeholder="Postcode"/>
    </div>
  </div>

  <div class="form-group required">
    <label for="amountChoice" class="col-sm-3">Monthly amount</label>
    <input type="hidden" name="amount" id="amount"/>

    <div class="col-sm-9">
      <div class="form-inline">
        <ul id="slider-values"></ul>
        <div id="slider"></div>
      </div>
    </div>

    <div class="col-sm-offset-3 col-sm-9">
      <div class="form-inline">
        <div class="input-group">
          <span class="input-group-addon">$</span>
          <input type="text" class="form-control disabled"
                 id="amountOther" autocomplete="off"
                 name="amountOther" placeholder="Other amount"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="newsletter" class="col-sm-3">Newsletter</label>

    <div class="col-sm-9">
      <div class="radio">
        <label id="newsletterEmail">
          <input type="radio" name="newsletter" id="newsletterEmail"
                 value="Email newsletter" checked="checked "/> Newsletter
          by email
        </label>
        <label id="newsletterPrint">
          <input type="radio" name="newsletter" id="newsletterPrint"
                 value="Printed newsletter"/> Printed newsletter by post
        </label>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="welcome-pack" class="col-sm-3">Welcome pack</label>

    <div class="col-sm-9">
      <div class="radio">
        <label id="welcomePackEmail">
          <input type="radio" name="welcome-pack" id="welcomePackEmail"
                 value="Email welcome pack" checked="checked "/> Welcome pack
          by email
        </label>
        <label id="welcomePackPrint">
          <input type="radio" name="welcome-pack" id="welcomePackPrint"
                 value="Printed welcome pack"/> Printed welcome pack by post (including membership card)
        </label>
        <label id="welcomePackPrint">
          <input type="radio" name="welcome-pack" id="alreadyMember"
                 value="Existing membership renewal"/> Existing membership renewal
        </label>
      </div>
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-9">
      <div class="checkbox">
        <label id="volunteering">
          <input type="checkbox" name="volunteering"/>
          I am interested in finding out more about
          volunteering
        </label>
      </div>
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-9">
      <div class="checkbox">
        <label id="spam">
          <input type="checkbox" name="spam" checked="checked"/>
          Join the Animal Liberation Qld email list? (1-2 emails per month)
        </label>
      </div>
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-5">
      <button type="submit" id="membershipFormSubmit" class="btn btn-primary">
        Submit
      </button>
    </div>
    <div class="col-sm-4" id="pp-logo">
      <img
          src="/<?= drupal_get_path('theme', 'alq') ?>/images/paypal.jpg"
          alt="PayPal"/>
    </div>
  </div>
</form>
