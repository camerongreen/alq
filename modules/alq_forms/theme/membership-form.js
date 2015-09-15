/**
 * Membership form
 */
(function ($) {
  var membershipEligibilityMinimums = {
    student: {
      annual: 25,
      monthly: 2
    },
    single: {
      annual: 35,
      monthly: 3
    },
    family: {
      annual: 55,
      monthly: 5
    },
    friend: {
      annual: 100,
      monthly: 10
    },
    lifetime : {
      annual: 500,
      monthly: null
    }
  };

  // Accessor functions

  function wantsSpam() {
    return $('#spam input').is(':checked');
  }

  function chosenOtherAmount() {
    return $('#amountOther input').is(':checked');
  }

  function newsletterType() {
    return $('input[name="newsletter"]:checked').id;
  }

  function membershipType() {
    return $('input[name="membershipType"]:checked').parent().prop('id');
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

  function eligibleForMembership() {
    var amount = getAmount();
    var paymentType = paymentType();
    var membershipType = membershipType();

    var eligibleAmount = membershipEligibilityMinimums[membershipType][paymentType];

    return amount >= eligibleAmount;
  }

  function emailValidator(value) {
    if (emailRequired()) {
      return value !== '';
    }

    return true;
  }

  function emailRequired() {
    return wantsSpam() || (newsletterType() === 'newsletterEmail');
  }

  function addressValidator(value) {
    if (newsletterType() === 'newsletterPrint') {
      return value !== '';
    }

    return true;
  }

  function amountOtherValueValidator(value) {
    if (chosenOtherAmount()) {
      return /^\d+$/.test(value) && eligibleForMembership()
    }

    return true;
  }

  $(document).ready(function () {
    setAmount();

    // listen for changes on the form, and check that the state is correct
    $('input[name="amountChoice"], #amountOtherValue, #membership input, input[name="paymentType"], input[name="newsletter"]', '#membershipForm').change(function () {
      setAmount();

      if ($('#amountOther input').is(':checked')) {
        $('#amountOtherValue').prop('disabled', '').removeClass('disabled');
      } else {
        $('#amountOtherValue').prop('disabled', 'disabled').addClass('disabled');
        $('#membershipForm').data('formValidation').resetField($('#amountOtherValue'));
      }
    });

    $('#spam input').change(function () {
      if (!emailRequired()) {
        $('#membershipForm').data('formValidation').resetField($('#email'));
      }
    });

    $('#oneoff, #monthly').click(function () {
      $('#paymentType').val(this.id);
      if (this.id === 'monthly') {
        $('#cmd').val('_xclick-subscriptions');
      } else {
        $('#cmd').val('_donations');
      }
    });


    $('#membershipForm').formValidation({
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
              message: 'Please specify at least ' + amountOtherMinimum + ' for amount',
              callback: amountOtherValueValidator
            }
          }
        },
        givenName: {
          validators: {
            notEmpty: {
              message: 'Please specify your given name',
            }
          }
        },
        familyName: {
          validators: {
            notEmpty: {
              message: 'Please specify your family name',
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
      $.post('/membership/submission', $form.serialize())
        .done(function (data) {
          // if the user is getting membership we send through
          // more information.  Otherwise we send very little
          var custom = [];

          custom.push('GN:' + $('#givenName').val());
          custom.push('FN:' + $('#familyName').val());
          custom.push('Email:' + $('#email').val());
          custom.push('Ph:' + $('#phone').val());
          custom.push('Type:' + $('input[name="paymentType"]:checked').val());
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
