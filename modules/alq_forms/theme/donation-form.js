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
    return $('input[name="newsletter"]:checked').val();
  }

  function getAmount() {
    var returnVal = 0;
    if (chosenOtherAmount()) {
      returnVal = parseInt($('#amountOtherValue').val(), 10);
    } else {
      returnVal = parseInt($('input[name="amount"]:checked', '#donationForm').val(), 10);
    }

    return returnVal;
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

  function eligibleForMembership() {
    return (getAmount() >= membershipEligibilityAmount)
      || ($('input[name="donationType"]:checked').val() === 'monthly');
  }

  function membershipRequired(value) {
    return wantsMembership() ? value !== '' : true;
  }

  function emailRequired(value) {
    if (
      wantsSpam() ||
      (wantsMembership() && (newsletterType() === 'newsletterPDF'))
    ) {
      return value !== '';
    }

    return true;
  }

  function addressRequired(value) {
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
    // listen for changes on the form, and check that the state is correct
    $('input[name="amount"], #amountOtherValue, #membership input, input[name="donationType"], input[name="newsletter"]', '#donationForm').change(function () {
      if ($('#amountOther input').prop('checked')) {
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

    $('#oneoff, #monthly').click(function () {
      $('#donationType').val(this.id);
    });

    $('#donationForm').submit(function () {
      console.log('timmy');
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
              callback: membershipRequired
            }
          }
        },
        familyName: {
          validators: {
            callback: {
              message: 'Please specify your family name',
              callback: membershipRequired
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
              callback: emailRequired
            }
          }
        },
        address1: {
          validators: {
            callback: {
              message: 'Please specify your address for the newsletter',
              callback: addressRequired
            }
          }
        },
        town: {
          validators: {
            callback: {
              message: 'Please specify your town for the newsletter',
              callback: addressRequired
            }
          }
        },
        postcode: {
          validators: {
            callback: {
              message: 'Please specify your postcode for the newsletter',
              callback: addressRequired
            }
          }
        }
      }
    });
  });
})(jQuery);
