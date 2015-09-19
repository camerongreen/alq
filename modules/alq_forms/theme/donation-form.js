/**
 * Donation form with optional membership
 */
(function ($) {
  var membershipEligibilityAmount = 50;
  var amountOtherMonthlyMinimum = 5;
  var amountOtherMinimum = 2;

  var requiredMembershipOptions = [
    'givenName',
    'familyName',
    'address1',
    'suburb',
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

  function getMinimum() {
    return donationType() === 'monthly' ? amountOtherMonthlyMinimum : amountOtherMinimum;
  }

  function donationType() {
    return $('input[name="donationType"]:checked').parent().prop('id');
  }

  function setAmount() {
    var amount = 0;
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
      return /^\d+$/.test(value) && (value >= getMinimum());
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
        $('#donationForm').formValidation('revalidateField', 'amountOtherValue');
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
              message: 'Please specify at least $' + amountOtherMinimum + ' for single donations and $' + amountOtherMonthlyMinimum + ' for monthly donations',
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
              message: 'Please specify a valid email address'
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
              message: 'Please specify your address',
              callback: addressValidator
            }
          }
        },
        suburb: {
          validators: {
            callback: {
              message: 'Please specify your suburb',
              callback: addressValidator
            }
          }
        },
        postcode: {
          validators: {
            callback: {
              message: 'Please specify your postcode',
              callback: addressValidator
            }
          }
        }
      }
    }).on('success.form.fv', function (e) {
      // Prevent form submission
      e.preventDefault();
      e.stopImmediatePropagation();

      var $form = $(e.target),
        fv = $(e.target).data('formValidation');

      // submit for our records, if it is successful
      // then pass onto paypal
      $.post('/donate/submission', $form.serialize())
        .done(function (data) {
          // if the user is getting membership we send through
          // more information.  Otherwise we send very little
          var custom = [];

          if (wantsMembership()) {
            custom.push('GN:' + $('#givenName').val());
            custom.push('FN:' + $('#familyName').val());
            custom.push('Email:' + $('#email').val());
            custom.push('Ph:' + $('#phone').val());
          } else {
            if ($('#givenName').val()) {
              custom.push('GN:' + $('#givenName').val());
            }
            if ($('#familyName').val()) {
              custom.push('FN:' + $('#familyName').val());
            }
            if ($('#email').val()) {
              custom.push('Email:' + $('#email').val());
            }
          }
          custom.push('Type:' + $('input[name="donationType"]:checked').val());
          custom.push('Amount:$' + $('#amount').val());

          custom.push(data.message);
          $('#custom').val(custom.join(','));

          fv.defaultSubmit();
        }).fail(function () {
          alert('There has been a problem submitting this form, please get in touch with us via our Contact page');
        });
    });
  });
})(jQuery);
