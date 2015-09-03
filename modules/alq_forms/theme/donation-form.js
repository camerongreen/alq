/**
 * Donation form with optional membership
 */
(function ($) {
  var membershipEligibilityAmount = 50;
  var amountOtherMinimum = 5;

  var requiredMembershipOptions = [
    'givenName',
    'familyName',
    'address1',
    'town',
    'postcode'
  ];

  // Accessor functions

  function wantsMembership() {
    return $('#membership input').is(':checked');
  }

  function wantsSpam() {
    return $('#spam input').is(':checked');
  }

  function chosenOtherAmount() {
    return $('#amountOther input').is(':checked');
  }

  function newsletterType() {
    return $('input[name="newsletter"]:checked').id;
  }

  function getAmount() {
    return parseInt($('#amount').val(), 10);
  }

  function setAmount() {
    var amount = amountOtherMinimum;
    if (chosenOtherAmount()) {
      amount = $('#amountOtherValue').val();
    } else {
      amount = $('input[name="amountChoice"]:checked').val();
    }
    $('#amount').val(amount);
    $('#a3').val(amount); // for subscribe button
  }

  function enableMembership() {
    $('.membershipOptions').fadeIn();
    $('#membershipHeading').show();
    $('#informationHeading').hide();

    $(requiredMembershipOptions).each(function (index, value) {
      $('#' + value).parent().parent().addClass('required');
      $('#donationForm').data('formValidation').resetField($('#' + value));
    });
  }

  function disableMembership() {
    $('.membershipOptions').fadeOut();
    $('#membershipHeading').hide();
    $('#informationHeading').show();

    $(requiredMembershipOptions).each(function (index, value) {
      $('#' + value).parent().parent().removeClass('required');
      $('#donationForm').data('formValidation').resetField($('#' + value));
    });
  }

  function setMembershipOptions() {
    if (wantsMembership() && eligibleForMembership()) {
      enableMembership();
    } else {
      disableMembership();
    }
  }

  function donationType() {
    return $('input[name="donationType"]:checked').parent().prop('id');
  }

  function eligibleForMembership() {
    return (getAmount() >= membershipEligibilityAmount)
      || (donationType() === 'monthly');
  }

  function membershipValidator(value) {
    return wantsMembership() ? value !== '' : true;
  }

  function emailValidator(value) {
    if (emailRequired()) {
      return value !== '';
    }

    return true;
  }

  function emailRequired() {
    return wantsSpam() || (wantsMembership() && (newsletterType() === 'newsletterEmail'));
  }

  function addressValidator(value) {
    if (wantsMembership() && (newsletterType() === 'newsletterPrint')) {
      return value !== '';
    }

    return true;
  }

  function amountOtherValueValidator(value) {
    if (chosenOtherAmount()) {
      return /^\d+$/.test(value) && (value > amountOtherMinimum);
    }

    return true;
  }

  $(document).ready(function () {
    setAmount();

    // listen for changes on the form, and check that the state is correct
    $('input[name="amountChoice"], #amountOtherValue, #membership input, input[name="donationType"], input[name="newsletter"]', '#donationForm').change(function () {
      setAmount();

      if ($('#amountOther input').is(':checked')) {
        $('#amountOtherValue').prop('disabled', '').removeClass('disabled');
      } else {
        $('#amountOtherValue').prop('disabled', 'disabled').addClass('disabled');
        $('#donationForm').data('formValidation').resetField($('#amountOtherValue'));
      }

      if (eligibleForMembership()) {
        $('#membershipInfo').hide();
        $('#membership').fadeIn();
      } else {
        $('#membership').hide();
        $('#membershipInfo').fadeIn();
      }

      setMembershipOptions();
    });

    $('#spam input').change(function () {
      if (!emailRequired()) {
        $('#donationForm').data('formValidation').resetField($('#email'));
      }
    });

    $('#oneoff, #monthly').click(function () {
      $('#donationType').val(this.id);
      if (this.id === 'monthly') {
        $('#cmd').val('_xclick-subscriptions');
      } else {
        $('#cmd').val('_donations');
      }
    });

    // if the user is getting membership we send through
    // more information.  Otherwise we send very little
    $('#donationForm').submit(function (event) {
      var custom = [];
      var invoice = [];
      if (wantsMembership()) {
        custom.push('Given:' + $('#givenName').val());
        custom.push('Family:' + $('#familyName').val());
        custom.push('Email:' + $('#email').val());
        custom.push('Ph:' + $('#phone').val());
        custom.push('Addr1:' + $('#address1').val());
        if ($('#address2').val()) {
          custom.push('Addr2:' + $('#address2').val());
        }
        custom.push('Town:' + $('#town').val());
        custom.push('PC:' + $('#postcode').val());
        if ($('#occupation').val()) {
          custom.push('Occp:' + $('#occupation').val());
        }
        custom.push('Sex:' + $('input[name="gender"]:checked').val());
        invoice.push('Type:' + $('#membershipType').val());
        invoice.push('Newsletter:' + $('input[name="newsletter"]:checked').val());
        invoice.push('Volunteer:' + ($('#volunteering input').is(':checked') ? 'Yes' : 'No'));
        invoice.push('Email list:' + ($('#spam input').is(':checked') ? 'Yes' : 'No'));
      } else {
        if ($('#givenName').val()) {
          custom.push('Given:' + $('#givenName').val());
        }
        if ($('#familyName').val()) {
          custom.push('Family:' + $('#familyName').val());
        }
        if ($('#email').val()) {
          custom.push('Email:' + $('#email').val());
          invoice.push('Email list:' + ($('#spam input').is(':checked') ? 'Yes' : 'No'));
        }
      }
      invoice.push('Donation type:' + $('input[name="donationType"]:checked').val());
      invoice.push('Amount:$' + $('#amount').val());

      $('#custom').val(custom.join(',\n'));
      $('#invoice').val(invoice.join(',\n'));
      //event.preventDefault();
    });

    $('#donationForm').formValidation({
      framework: 'bootstrap',
      excluded: [':hidden', ':not(:visible)'],
      icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        amountOtherValue: {
          validators: {
            callback: {
              message: 'Please specify a number greater than ' + amountOtherMinimum + ' for amount',
              callback: amountOtherValueValidator
            }
          }
        },
        givenName: {
          validators: {
            callback: {
              message: 'Please specify your given name',
              callback: membershipValidator
            }
          }
        },
        familyName: {
          validators: {
            callback: {
              message: 'Please specify your family name',
              callback: membershipValidator
            }
          }
        },
        email: {
          validators: {
            emailAddress: {
              message: 'Please specify a valid email address',
            },
            callback: {
              message: 'Please specify your email address',
              callback: emailValidator
            }
          }
        },
        address1: {
          validators: {
            callback: {
              message: 'Please specify your address for the newsletter',
              callback: addressValidator
            }
          }
        },
        town: {
          validators: {
            callback: {
              message: 'Please specify your town for the newsletter',
              callback: addressValidator
            }
          }
        },
        postcode: {
          validators: {
            callback: {
              message: 'Please specify your postcode for the newsletter',
              callback: addressValidator
            }
          }
        }
      }
    });
  });
})(jQuery);
