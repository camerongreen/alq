/**
 * Membership form
 */
(function ($) {
  var monthlyMinimum = 5;
  var membershipEligibilityMinimums = {
    'Student/Unwaged': 25,
    Individual: 35,
    Family: 55,
    Lifetime: 500
  };

  // Accessor functions

  function wantsSpam() {
    return $('#spam input').is(':checked');
  }

  function wantsAnnual() {
    return $('#annual input').is(':checked');
  }

  function hasChosenOtherAmount() {
    return $('#amountOther input').is(':checked');
  }

  function getNewsletterType() {
    return $('input[name="newsletter"]:checked').id;
  }

  function getMembershipType() {
    return $('#membershipType option:selected').val();
  }

  function getAmount() {
    return parseInt($('#amount').val(), 10);
  }

  function getDonationType() {
    return $('input[name="donationType"]:checked').parent().prop('id');
  }

  function setAmount() {
    var amount = 0;
    if (hasChosenOtherAmount()) {
      amount = $('#amountOtherValue').val();
    } else {
      amount = $('input[name="amountChoice"]:checked').val();
    }
    $('#amount').val(amount);
    $('#a3').val(amount); // for subscribe button
  }

  function validAmount() {
    var amount = getAmount();
    var donationType = getDonationType();
    var membershipType = getMembershipType();
    var eligibleAmount = 0;

    if (donationType === 'monthly') {
      eligibleAmount = monthlyMinimum;
    } else {
      eligibleAmount = membershipEligibilityMinimums[membershipType];
    }

    return amount >= eligibleAmount;
  }

  function emailValidator(value) {
    if (emailRequired()) {
      return value !== '';
    }

    return true;
  }

  function emailRequired() {
    return wantsSpam() || (getNewsletterType() === 'newsletterEmail');
  }

  function amountOtherValueValidator(value) {
    // call this just to be sure we have the current amount
    setAmount();
    if (hasChosenOtherAmount()) {
      return /^\d+$/.test(value) && validAmount()
    }

    return true;
  }

  function showMonthlyOptions() {
    $('.monthlyOption').show();
    $('.oneoffOption').hide();
    // change the active marker if it isn't amount other
    if (!hasChosenOtherAmount()) {
      $('#amount2').click();
    }
  }

  function showOneoffOptions() {
    $('.monthlyOption').hide();
    // and reset the active marker if it isn't amount other
    $('.oneoffOption').show();
    if (!hasChosenOtherAmount()) {
      $('#oneoffAmount').click();
    }
  }

  function setMembershipAmount() {
    var oneoff = membershipEligibilityMinimums[getMembershipType()];
    $('#oneoffAmount input').val(oneoff);
    $('#oneoffAmount span').text(oneoff);
    $('#membershipForm').data('formValidation').revalidateField($('#amountOtherValue'));
  }

  $(document).ready(function () {
    setAmount();

    // listen for most changes on the form, and check the state
    $('input[name="amountChoice"], #amountOtherValue, #membership input, input[name="donationType"], input[name="annual"], input[name="newsletter"]', '#membershipForm').change(function () {
      setAmount();

      if ($('#amountOther input').is(':checked')) {
        $('#amountOtherValue').prop('disabled', '').removeClass('disabled');
      } else {
        $('#amountOtherValue').prop('disabled', 'disabled').addClass('disabled');
        $('#membershipForm').data('formValidation').resetField($('#amountOtherValue'));
      }
    });

    $('#membershipType').change(function () {
      setMembershipAmount();
    });

    $('#oneoff, #monthly').click(function () {
      $('#donationType').val(this.id);
      if (this.id === 'monthly') {
        showMonthlyOptions();
        $('#cmd').val('_xclick-subscriptions');
        $('#t3').val('M');
      } else {
        showOneoffOptions();
        if (wantsAnnual()) {
          $('#cmd').val('_xclick-subscriptions');
          $('#t3').val('Y');
        } else {
          $('#cmd').val('_donations');
        }
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
              message: 'Monthly minimum is $' + monthlyMinimum + ', for annual it is the amount shown to the left of "Other"',
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
            notEmpty: {
              message: 'Please specify your address',
            }
          }
        },
        suburb: {
          validators: {
            notEmpty: {
              message: 'Please specify your suburb',
            }
          }
        },
        postcode: {
          validators: {
            notEmpty: {
              message: 'Please specify your postcode',
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
