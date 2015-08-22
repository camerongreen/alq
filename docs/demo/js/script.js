/**
 * Donation form with optional membership
 */
$(document).ready(function () {

  var membershipEligibilityAmount = 50;

  var requiredMembershipOptions = [
    'givenName',
    'familyName'
  ];

  var requiredMembershipOptionsPost = requiredMembershipOptions.slice(0);
  requiredMembershipOptionsPost.push('address1', 'town', 'postcode');

  var requiredMembershipOptionsEmail = requiredMembershipOptions.slice(0);
  requiredMembershipOptionsEmail.push('email');

  // Accessor functions

  function wantsMembership() {
    return $('#membership input').is(':checked');
  }

  function wantsSpam() {
    return $('#spam').is(':checked');
  }

  function chosenOtherAmount() {
    return $('#amountOther').is(':checked');
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

  function enableMembership () {
    $('.membershipOptions').fadeIn();
    $('#membershipHeading').show();
    $('#informationHeading').hide();

    if (newsletterType() == 'newsletterPDF') {
      $(requiredMembershipOptionsPost).each(function (index, value) {
          $('#' + value).parent().parent().removeClass('required');
      });
      $(requiredMembershipOptionsEmail).each(function (index, value) {
        $('#' + value).parent().parent().addClass('required');
      });
    } else {
      $(requiredMembershipOptionsEmail).each(function (index, value) {
        $('#' + value).parent().parent().removeClass('required');
      });
      $(requiredMembershipOptionsPost).each(function (index, value) {
        $('#' + value).parent().parent().addClass('required');
      });
    }
  }

  function disableMembership() {
    $('.membershipOptions').fadeOut();
    $('#membershipHeading').hide();
    $('#informationHeading').show();

    $(requiredMembershipOptionsPost).each(function (index, value) {
      $('#' + value).parent().parent().removeClass('required');
    });

    $(requiredMembershipOptionsEmail).each(function (index, value) {
      $('#' + value).parent().parent().removeClass('required');
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
    return wantsMembership() ? value !== '': true;
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
      return /^\d+$/.test(value) && (value !== '0');
    }

    return true;
  }

  // listen for changes on the form, and check that the state is correct
  $('input[name="amount"], #amountOtherValue, #membership input, input[name="donationType"], input[name="newsletter"]', '#donationForm').change(function () {
    if ($('#amountOther').prop('checked')) {
      $('#amountOtherValue').prop('disabled', '').removeClass('disabled');
    } else {
      $('#amountOtherValue').prop('disabled', 'disabled').addClass('disabled');
      $('#donationForm').data('formValidation').resetField($('#amountOtherValue'));
    }

    if (eligibleForMembership()) {
      $('#membership').fadeIn();
    } else {
      $('#membership').fadeOut();
    }

    setMembershipOptions();
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
            message: 'Please specify a number for amount',
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