/**
 * Donation form with optional membership
 */
(function ($) {
  var donationMinimum = 2;

  function wantsSpam() {
    return $('#spam input').is(':checked');
  }

  function chosenOtherAmount() {
    return $('#amountOther input').is(':checked');
  }

  function getMinimum() {
    return donationMinimum;
  }

  function setAmount() {
    var amount = 0;
    if (chosenOtherAmount()) {
      amount = $('#amountOtherValue').val();
    }
    else {
      amount = $('input[name="amountChoice"]:checked').val();
    }
    $('#amount').val(amount);
    $('#a3').val(amount); // for subscribe button
  }

  function emailValidator(value) {
    if (wantsSpam()) {
      return value !== '';
    }

    return null;
  }

  function amountOtherValueValidator(value) {
    if (chosenOtherAmount()) {
      return /^(\d+|\d+\.\d+)$/.test(value) && (value >= getMinimum());
    }

    return null;
  }

  $(document).ready(function () {
    setAmount();

    // listen for changes on the form, and check that the state is correct
    $('input[name="amountChoice"], #amountOtherValue, input[name="donationType"], input[name="newsletter"]', '#donationForm').change(function () {
      setAmount();

      if ($('#amountOther input').is(':checked')) {
        $('#amountOtherValue').prop('disabled', '').removeClass('disabled');
        $('#donationForm').formValidation('revalidateField', 'amountOtherValue');
      }
      else {
        $('#amountOtherValue').prop('disabled', 'disabled').addClass('disabled');
        $('#donationForm').data('formValidation').resetField($('#amountOtherValue'));
      }
    });

    $('#spam input').change(function () {
      if (!emailRequired()) {
        $('#donationForm').data('formValidation').resetField($('#email'));
      }
    });

    $('#oneoff, #monthly, #annual').click(function () {
      $('#donationType').val(this.id);
      if (this.id === 'monthly') {
        $('#t3').val('M');
        $('#cmd').val('_xclick-subscriptions');
      }
      else if (this.id === 'annual') {
        $('#t3').val('Y');
        $('#cmd').val('_xclick-subscriptions');
      }
      else {
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
              message: 'Please specify at least $' + getMinimum() + ' for donations',
              callback: amountOtherValueValidator
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
            if (data.type !== 'success') {
              alert('There has been a problem creating this form, please get in touch with us via our Contact page');
            }
            else {
              // if the user is getting membership we send through
              // more information.  Otherwise we send very little
              var custom = [];

              if ($('#givenName').val()) {
                custom.push('GN:' + $('#givenName').val());
              }
              if ($('#familyName').val()) {
                custom.push('FN:' + $('#familyName').val());
              }
              if ($('#email').val()) {
                custom.push('Email:' + $('#email').val());
              }

              custom.push('Type:' + $('input[name="donationType"]:checked').val());
              custom.push('Amount:$' + $('#amount').val());

              custom.push(data.message);
              $('#custom').val(custom.join(','));

              fv.defaultSubmit();
            }
          }).fail(function () {
        alert('There has been a problem submitting this form, please get in touch with us via our Contact page');
      });
    });
  });
})(jQuery);
