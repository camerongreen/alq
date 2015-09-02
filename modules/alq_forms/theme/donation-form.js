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
    if (chosenOtherAmount()) {
      $('#amount').val($('#amountOtherValue').val());
    } else {
      $('#amount').val($('input[name="amountChoice"]:checked').val());
    }
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
      if (wantsMembership()) {
        custom.push('Given name: ' + $('#givenName').val());
        custom.push('Family name: ' + $('#familyName').val());
        custom.push('Email: ' + $('#email').val());
        custom.push('Phone: ' + $('#phone').val());
        custom.push('Address1: ' + $('#address1').val());
        if ($('#address2').val()) {
          custom.push('Address2: ' + $('#address2').val());
        }
        custom.push('Town/Suburb: ' + $('#town').val());
        custom.push('Postcode: ' + $('#postcode').val());
        if ($('#occupation').val()) {
          custom.push('Occupation: ' + $('#occupation').val());
        }
        custom.push('Type: ' + $('#membershipType').val());
        custom.push('Gender: ' + $('input[name="gender"]:checked').val());
        custom.push('Newsletter: ' + $('input[name="newsletter"]:checked').val());
        custom.push('Volunteering: ' + ($('#volunteering input').is(':checked') ? 'Yes' : 'No'));
        custom.push('Mailing list: ' + ($('#spam input').is(':checked') ? 'Yes' : 'No'));
      } else {
        if ($('#givenName').val()) {
          custom.push('Given name: ' + $('#givenName').val());
        }
        if ($('#familyName').val()) {
          custom.push('Family name: ' + $('#familyName').val());
        }
        if ($('#email').val()) {
          custom.push('Email: ' + $('#email').val());
          custom.push('Mailing list: ' + ($('#spam input').is(':checked') ? 'Yes' : 'No'));
        }
      }
      custom.push('Donation type: ' + $('input[name="donationType"]:checked').val());
      custom.push('Amount: $' + $('#amount').val());

      $('#custom').val(custom.join(',\n'));
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
