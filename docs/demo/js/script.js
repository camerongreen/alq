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

  function getAmount() {
    var returnVal = 0;
    if ($('#amountOther').prop('checked')) {
      returnVal = parseInt($('#amountOtherValue').val(), 10);
    } else {
      returnVal = parseInt($('input[name="amount"]:checked', '#donationForm').val(), 10);
    }

    return returnVal;
  }

  function wantsMembership() {
    return $('#membership input').prop('checked');
  }

  function newsletterType() {
    return $('input[name="newsletter"]:checked').val();
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
  }

  function setMembershipOptions() {
    if (wantsMembership() && eligibleForMembership()) {
      enableMembership();
    } else {
      disableMembership();
    }
  }

  function eligibleForMembership() {
    return (getAmount() > membershipEligibilityAmount)
    || ($('input[name="donationType"]:checked').val() === 'monthly');
  }

  function membershipRequired(value) {
    return wantsMembership() ? value !== '': true;
  }

  function emailRequired(value) {
    if (wantsMembership() && (newsletterType() === 'newsletterPDF')) {
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


  // listen for changes on any of these values, and check if
  // the current state is eligible for membership
  $('input[name="amount"], #amountOtherValue, input[name="donationType"], input[name="newsletter"]', '#donationForm').change(function () {
    if ($('#amountOther').prop('checked')) {
      $('#amountOtherValue').prop('disabled', '').removeClass('disabled');
    } else {
      $('#amountOtherValue').prop('disabled', 'disabled').addClass('disabled');
    }

    if (eligibleForMembership()) {
      $('#membership').fadeIn();
    } else {
      $('#membership').fadeOut();
    }

    setMembershipOptions();
  });

  $('#membership input').change(function () {
      setMembershipOptions();
  });

  $('#donationForm').formValidation({
    framework: 'bootstrap',
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
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
            message: 'Please specify your email for the newsletter',
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