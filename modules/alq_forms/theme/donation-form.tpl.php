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

      <form class="form-horizontal" id="donationForm" action="<?= $action ?>">
        <input type="text" name="custom" id="custom"/>

        <div class="form-group">
          <label for="donationType" class="col-sm-3">Donation type</label>
          <input type="hidden" name="cmd" id="cmd" value="_donations" />

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
          <input type="hidden" name="amount" id="amount" />

          <div class="col-sm-9">
            <div class="form-inline">
              <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary active" id="amount1">
                  <input type="radio" name="amountChoice"
                         value="250" checked="checked"/> $250
                </label>
                <label class="btn btn-primary" id="amount2">
                  <input type="radio" name="amountChoice"
                         value="100"/> $100
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
                <input type="checkbox"/>
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
          <label for="town" class="col-sm-3">Town/Suburb</label>

          <div class="col-sm-9">
            <input type="text" class="form-control" id="town" name="town"
                   placeholder="Town/Suburb"/>
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
          <label for="gender" class="col-sm-3">Gender</label>

          <div class="col-sm-9">
            <div class="radio">
              <label>
                <input type="radio" name="gender"
                       id="genderFemale" value="Female"/> Female
              </label>
              <label>
                <input type="radio" name="gender"
                       id="genderMale" value="Male"/> Male
              </label>
              <label>
                <input type="radio" name="gender"
                       id="genderOther" value="Other/Undisclosed"
                       checked="checked"/>
                Other/Undisclosed
              </label>
            </div>
          </div>
        </div>

        <div class="form-group membershipOptions">
          <label for="gender" class="col-sm-3">Newsletter</label>

          <div class="col-sm-9">
            <div class="radio">
              <label id="newsletterEmail">
                <input type="radio" name="newsletter" id="newsletterEmail"
                       value="Email newsletter" checked="checked "/> Newsletter by email
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
          <div class="col-sm-offset-3 col-sm-9">
            <input type="hidden" name="on0" value="Form Information"/>
            <input type="hidden" name="os0"/>
            <input type="hidden" name="on1" value="Notes"/>
            <input type="hidden" name="os1"/>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>

    <div role="tabpanel" class="tab-pane" id="bequests">
      <h2>Bequests</h2>

      <p>Talk about how helpful bequests are and we can give them personal
        assistance etc.</p>

      <p>Link to any forms we can point them to or info.</p>

      <h3>Acknowledgements</h3>

      <p>Animal Liberation Qld gratefully acknowledges the following, whose
        bequests have been of great significance in helping our vital work.</p>
      <ul class="list-group">
        <li class="list-group-item">Persona Uno</li>
        <li class="list-group-item">Persona Dos</li>
        <li class="list-group-item">Persona Tres y familia</li>
      </ul>
    </div>

    <div role="tabpanel" class="tab-pane" id="donations">
      <h2>Other ways to donate</h2>

      <p>We also accept donation by cheque which can be <a href="/contact">mailed
          to our PO Box</a>. For other donation options, please <a
          href="/contact">contact our office for further information</a>.</p>
    </div>
  </div>
</div>