/**
 * Membership form
 */
(function ($) {
  var defaultDonation = 10;
  var monthlyDonations = [5, 10, 15, 20, 30, 50, 100];

  // Accessor functions

  function hasChosenOtherAmount() {
    return $('#amountOther').val() !== '';
  }

  function getAmount() {
    return parseInt($('#amount').val(), 10);
  }

  function setAmount() {
    var amount = 0;
    if (hasChosenOtherAmount()) {
      $('#slider').slider('disable');
      $('#slider-values li').removeClass('active');
      amount = $('#amountOther').val();
    }
    else {
      $('#slider').slider('enable');
      amount = monthlyDonations[$('#slider').slider('value')];
      $('#slider-values').find('li').removeClass('active');
      $('#slider-values').find('li.value-' + amount).addClass('active');
    }
    $('#amount').val(amount);
    $('#a3').val(amount); // for subscribe button
  }

  function validAmount() {
    return getAmount() >= monthlyDonations[0];
  }

  function emailValidator(value) {
    return value !== '';
  }

  function amountOtherValidator(value) {
    // call this just to be sure we have the current amount
    setAmount();
    if (hasChosenOtherAmount()) {
      return /^(\d+|\d+\.\d+)$/.test(value) && validAmount();
    }

    return null;
  }

  $(document).ready(function () {
    var slider_values = $('#slider-values');

    $.each(monthlyDonations, function (index) {
      $(slider_values).append($('<li>').text('$' + this).addClass('value-' + this).click(function () {
         $('#slider').slider('value', index);
      }));
    });

    $("#slider").slider({
      min: 0,
      max: monthlyDonations.length - 1,
      step: 1,
      animate: true,
      value: monthlyDonations.indexOf(defaultDonation),
      change: setAmount
    });

    setAmount();

    // listen for most changes on the form, and check the state
    $('#amountOther', '#membershipForm').change(function () {
      setAmount();
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
        amountOther: {
          validators: {
            callback: {
              message: 'Must be numeric and the minimum is $' + monthlyDonations[0],
              callback: amountOtherValidator
            }
          }
        },
        givenName: {
          validators: {
            notEmpty: {
              message: 'Please specify your given name'
            }
          }
        },
        familyName: {
          validators: {
            notEmpty: {
              message: 'Please specify your family name'
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
              message: 'Please specify your address'
            }
          }
        },
        phone: {
          validators: {
            notEmpty: {
              message: 'Please specify your telephone number'
            }
          }
        },
        suburb: {
          validators: {
            notEmpty: {
              message: 'Please specify your suburb'
            }
          }
        },
        postcode: {
          validators: {
            notEmpty: {
              message: 'Please specify your postcode'
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
            var custom = [];

            custom.push('GN:' + $('#givenName').val());
            custom.push('FN:' + $('#familyName').val());
            custom.push('Email:' + $('#email').val());
            custom.push('Ph:' + $('#phone').val());
            custom.push('Address 1:' + $('#address1').val());
            custom.push('Address 2:' + $('#address2').val());
            custom.push('Suburb:' + $('#suburb').val());
            custom.push('Postcode:' + $('#postcode').val());
            custom.push('Newsletter:' + $('input[name="newsletter"]:checked').val());
            custom.push('Welcome pack:' + $('input[name="welcome-pack"]:checked').val());
            custom.push('Volunteering:' + $('input[name="volunteering"]:checked').val());
            custom.push('Mailing list:' + $('input[name="spam"]:checked').val());
            custom.push('Amount:$' + $('#amount').val());

            custom.push(data.message);

            // Field has limit of 255 characters, so send what we can.
            $('#custom').val(custom.join(',').substr(0, 255));

            fv.defaultSubmit();
          }).fail(function () {
        alert('There has been a problem submitting this form, please get in touch with us via our Contact page');
      });
    });
  });
})(jQuery);
