$(document).ready(function () {
  var membershipEligibilityAmount = 50;

  function getAmount() {
    var returnVal = 0;
    if ($('#amountOther').prop('checked')) {
      returnVal = parseInt($('#amountOtherValue').val(), 10);
    } else {
      returnVal = parseInt($('input[name="amount"]:checked', '#donationForm').val(), 10);
    }

    return returnVal;
  }

  function setMembershipOptions() {
    if ($('#membership input').prop('checked')) {
      $('.membershipOptions').fadeIn();
      $('#membershipHeading').show();
      $('#informationHeading').hide();
    } else {
      $('.membershipOptions').fadeOut();
      $('#membershipHeading').hide();
      $('#informationHeading').show();
    }
  }

  $('input[name="amount"], #amountOtherValue', '#donationForm').change(function () {
    if ($('#amountOther').prop('checked')) {
      $('#amountOtherValue').prop('disabled', '');
      $('#amountOtherValue').removeClass('disabled');
    } else {
      $('#amountOtherValue').prop('disabled', 'disabled');
      $('#amountOtherValue').addClass('disabled');
    }

    if (getAmount() >= membershipEligibilityAmount) {
      $('#membership').fadeIn();
      setMembershipOptions();
    } else {
      $('#membership').fadeOut();
      $('.membershipOptions').fadeOut();
    }
  });

  $('#membership input').change(function () {
      setMembershipOptions();
  });
});