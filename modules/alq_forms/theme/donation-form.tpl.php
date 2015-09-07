<div class="tabs-container">
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#online"
                                              aria-controls="online"
                                              role="tab" data-toggle="tab">Online</a>
    </li>
    <li role="presentation"><a href="#bequests"
                               aria-controls="bequests"
                               role="tab" data-toggle="tab">Bequests</a>
    </li>
    <li role="presentation"><a href="#donations"
                               aria-controls="donations"
                               role="tab" data-toggle="tab">Other ways to
        donate</a>
    </li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="online">
      <h2>Online Donation</h2>

      <form class="form-horizontal" id="donationForm" method="post"
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
        <input type="hidden" name="src" value="1">
        <input type="hidden" name="a3" id="a3" value="">
        <input type="hidden" name="p3" value="1">
        <input type="hidden" name="t3" value="M">

        <!-- /variables from paypal -->

        <!-- pass-through variables paypal will send on -->
        <input type="hidden" name="custom" id="custom"/>
        <!-- /pass-through variables paypal will send on -->

        <div class="form-group">
          <label for="donationType" class="col-sm-3">Donation type</label>
          <input type="hidden" name="cmd" id="cmd" value="_donations"/>

          <div class="col-sm-9">
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-primary active" id="oneoff">
                <input type="radio" name="donationType"
                       value="One off" checked="checked"/> Single
              </label>
              <label class="btn btn-primary" id="monthly">
                <input type="radio" name="donationType"
                       value="Monthly"/> Monthly
              </label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="amountChoice" class="col-sm-3">Donation amount</label>
          <input type="hidden" name="amount" id="amount"/>

          <div class="col-sm-9">
            <div class="form-inline">
              <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary" id="amount1">
                  <input type="radio" name="amountChoice"
                         value="250"/> $250
                </label>
                <label class="btn btn-primary active" id="amount2">
                  <input type="radio" name="amountChoice"
                         value="100" checked="checked"/> $100
                </label>
                <label class="btn btn-primary" id="amount3">
                  <input type="radio" name="amountChoice"
                         value="50"/> $50
                </label>
                <label class="btn btn-primary" id="amount4">
                  <input type="radio" name="amountChoice"
                         value="25"/> $25
                </label>
                <label class="btn btn-primary" id="amountOther">
                  <input type="radio" name="amountChoice"
                         value="amountOther"/> Other
                </label>
              </div>
              <div class="input-group">
                <span class="input-group-addon">$</span>
                <input type="text" class="form-control disabled"
                       id="amountOtherValue" autocomplete="off"
                       name="amountOtherValue" placeholder="Other amount"
                       disabled="disabled"
                  />
              </div>
            </div>
          </div>
        </div>

        <div class="form-group" id="membership">
          <div class="col-sm-offset-3 col-sm-9">
            <div class="checkbox">
              <label>
                <input type="checkbox" name="membership"/>
                Would you like a complimentary membership? <a
                  href="/content/membership-benefits" id="membershipBenefits"
                  target="_blank">Membership Benefits</a>
                <small>(new window)</small>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group" id="membershipInfo">
          <div class="col-sm-offset-3 col-sm-9">
            All monthly donations and any single donations over $50 are eligible
            for a complimentary membership
          </div>
        </div>


        <h2 id="informationHeading">Optional information</h2>

        <h2 id="membershipHeading">Membership information</h2>

        <div class="requiredLegend membershipOptions">
          Required Fields <span>&#x2605;</span>
        </div>
        <div class="form-group">
          <label for="givenName" class="col-sm-3">Given Name</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="givenName"
                   name="givenName" placeholder="Given Name">
          </div>
        </div>

        <div class="form-group">
          <label for="familyName" class="col-sm-3">Family Name</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="familyName"
                   name="familyName"
                   placeholder="Family Name">
          </div>
        </div>

        <div class="form-group membershipOptions" id="title">
          <label for="title" class="col-sm-3">Title</label>

          <div class="col-sm-9">
            <select name="title">
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

        <div class="form-group">
          <label for="email" class="col-sm-3">Email</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="email" name="email"
                   placeholder="Email"/>
          </div>
        </div>

        <div class="form-group membershipOptions">
          <label for="phone" class="col-sm-3">Phone</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="phone" name="phone"
                   placeholder="Phone"/>
          </div>
        </div>

        <div class="form-group membershipOptions">
          <label for="address1" class="col-sm-3">Address 1</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="address1"
                   name="address1"
                   placeholder="Address Line 1"/>
          </div>
        </div>

        <div class="form-group membershipOptions">
          <label for="address2" class="col-sm-3">Address 2</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="address2"
                   name="address2"
                   placeholder="Address Line 2"/>
          </div>
        </div>

        <div class="form-group membershipOptions">
          <label for="town" class="col-sm-3">Suburb/Town</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="suburb" name="suburb"
                   placeholder="Suburb/Town"/>
          </div>
        </div>

        <div class="form-group membershipOptions">
          <label for="postcode" class="col-sm-3">Postcode</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="postcode"
                   name="postcode"
                   placeholder="Postcode"/>
          </div>
        </div>

        <div class="form-group membershipOptions">
          <label for="occupation" class="col-sm-3">Occupation</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="occupation"
                   name="occupation"
                   placeholder="Occupation"/>
          </div>
        </div>


        <div class="form-group membershipOptions">
          <label for="membershipType" class="col-sm-3">Membership Type</label>

          <div class="col-sm-9">
            <select class="form-control" id="membershipType"
                    name="membershipType">
              <option value="Individual">Individual</option>
              <option value="Student/Unwaged">Student/Unwaged</option>
              <option value="Family">Family</option>
            </select>
          </div>
        </div>

        <div class="form-group membershipOptions">
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

        <div class="form-group membershipOptions">
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
                Would you like to join the Animal Liberation Queensland
                mailing list?
              </label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-5">
            <button type="submit" id="donationFormSubmit" class="btn btn-primary">Submit</button>
          </div>
          <div class="col-sm-4" id="pp-logo">
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
              alt="PayPal Acceptance Mark"/>
          </div>
        </div>
      </form>
    </div>

    <div role="tabpanel" class="tab-pane" id="bequests">
      <h2>Bequests</h2>

      <p>Remembering the animals in your will is a wonderful way to leave a
        compassionate legacy.</p>

      <p>Please <a href="/contact">contact our office</a> for further
        information.</p>

    </div>

    <div role="tabpanel" class="tab-pane" id="donations">
      <h2>Other ways to donate</h2>

      <p>We also accept donation by cheque which can be <a href="/contact">mailed
          to our PO Box</a>. For other donation options, please <a
          href="/contact">contact our office for further information</a>.</p>
    </div>
  </div>
</div>