<?php

/**
 * @file
 * Donation form template (no longer used).
 */
?>
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
                  action="<?php echo $action ?>">
                <!-- variables from paypal -->
                <input type="hidden" name="a3" id="a3" value=""/>
                <input type="hidden" name="business" value="<?php echo $business ?>"/>
                <input type="hidden" name="cancel_return"
                       value="<?php echo $redirect_url_cancel ?>"/>
                <input type="hidden" name="cmd" id="cmd" value="_donations"/>
                <input type="hidden" name="currency_code" value="AUD"/>
                <input type="hidden" name="item_name"
                       value="Animal Liberation Qld"/>
                <input type="hidden" name="item_number" id="item_number" value="One off donation"/>
                <input type="hidden" name="lc" value="AU"/>
                <input type="hidden" name="no_note" value="1"/>
                <input type="hidden" name="no_shipping" value="1"/>
                <input type="hidden" name="p3" value="1"/>
                <input type="hidden" name="return"
                       value="<?php echo $redirect_url ?>"/>
                <input type="hidden" name="rm" value="1"/>
                <input type="hidden" name="src" value="1"/>
                <input type="hidden" name="subject" value="Donation"/>
                <input type="hidden" name="t3" id="t3" value=""/>

                <!-- /variables from paypal -->

                <!-- pass-through variables paypal will send on -->
                <input type="hidden" name="custom" id="custom"/>
                <!-- /pass-through variables paypal will send on -->

                <div class="form-group">
                    <label for="donationType" class="col-sm-3">Donation
                        type</label>

                    <div class="col-sm-9">
                        <div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-primary active" id="oneoff">
                                <input type="radio" name="donationType"
                                       value="One off" checked="checked"/>
                                Single
                            </label>
                            <label class="btn btn-primary" id="monthly">
                                <input type="radio" name="donationType"
                                       value="Monthly"/> Monthly
                            </label>
                            <label class="btn btn-primary" id="annual">
                                <input type="radio" name="donationType"
                                       value="Annual"/> Annual
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="amountChoice" class="col-sm-3">Donation
                        amount</label>
                    <input type="hidden" name="amount" id="amount"/>

                    <div class="col-sm-9">
                        <div class="form-inline">
                            <div class="btn-group" data-toggle="buttons">
                                <label class="btn btn-primary active"
                                       id="amount1">
                                    <input type="radio" name="amountChoice"
                                           value="20" checked="checked"/> $20
                                </label>
                                <label class="btn btn-primary" id="amount2">
                                    <input type="radio" name="amountChoice"
                                           value="50"/> $50
                                </label>
                                <label class="btn btn-primary" id="amount3">
                                    <input type="radio" name="amountChoice"
                                           value="100"/> $100
                                </label>
                                <label class="btn btn-primary" id="amount4">
                                    <input type="radio" name="amountChoice"
                                           value="250"/> $250
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
                                       name="amountOtherValue"
                                       placeholder="Other amount"
                                       disabled="disabled"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <h2 id="informationHeading">Optional information</h2>

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
                        <input type="text" class="form-control" id="email"
                               name="email"
                               placeholder="Email"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-3 col-sm-9">
                        <div class="checkbox">
                            <label id="spam">
                                <input type="checkbox" name="spam"/>
                                Would you like to join the Animal Liberation
                                Queensland
                                mailing list?
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-3 col-sm-5">
                        <button type="submit" id="donationFormSubmit"
                                class="btn btn-primary">Submit
                        </button>
                    </div>
                    <div class="col-sm-4" id="pp-logo">
                        <img
                                src="/<?php echo drupal_get_path('theme', 'alq') ?>/images/paypal.jpg"
                                alt="PayPal"/>
                    </div>
                </div>
            </form>
        </div>

        <div role="tabpanel" class="tab-pane" id="bequests">
            <h2>Bequests</h2>

            <p>Remembering the animals in your will is a wonderful way to leave
                a
                compassionate legacy.</p>

            <p>Please go to our <a href="/content/bequests">will/bequests
                    page</a> or <a href="/contact">contact our office</a> for
                further information.</p>
        </div>

        <div role="tabpanel" class="tab-pane" id="donations">
            <h2>Other ways to donate</h2>

            <p>We also accept donation by cheque which can be <a
                        href="/contact">mailed
                    to our PO Box</a>. For other donation options, please <a
                        href="/contact">contact our office for further
                    information</a>.</p>
        </div>
    </div>
</div>
