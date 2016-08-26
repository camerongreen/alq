/**
 * Functions to support the alp mps application
 */
(function ($) {
  var cache = [];

  /**
   * Takes a list of emailees (currently just one)
   * and add them to the form
   *
   * @param {Array} emailees
   */
  function showEmailees(emailees) {
    var emailee = emailees.shift();

    $('#edit-emailee-name').val(emailee.title);
    $('#edit-emailee-electorate').val(emailee.state_district);
    $('#edit-emailee-nid').val(emailee.nid);
  }

  /**
   * Check if the current value is in the cache
   *
   * @param data
   * @returns {boolean}
   */
  function inCache(data) {
    var stringData = JSON.stringify(data);
    for (var i = 0, l = cache.length; i < l; i++) {
      if (stringData === JSON.stringify(cache[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Take the JSON response and format it for the jQuery autocomplete
   *
   * @param data
   * @returns {Array}
   */
  function modifyResponse(data) {
    var returnVal = [];
    var seen = []; // only want each suburb to appear once

    for (var i = 0, l = data.length; i < l; i++) {
      var ac = data[i].locality + ' - ' + data[i].postcode + ' (State District: ' + data[i].state_district + ')';

      if (!inCache(data[i])) {
        cache.push(data[i]);
      }

      if (seen.indexOf(ac) === -1) {
        returnVal.push({
          label: ac,
          value: data[i]
        });
        seen.push(ac);
      }
    }

    return returnVal;
  }

  /**
   * Find all the emailees which correspond the current district
   *
   * @param state_district
   * @param data
   * @returns {Array}
   */
  function getEmailees(state_district, data) {
    var returnVal = [];
    var nids = [];

    for (var i = 0, l = data.length; i < l; i++) {
      var place = data[i];
      if ((place.state_district === state_district) && (nids.indexOf(place.nid) === -1)) {
        returnVal.push(place);
        nids.push(place.nid);
      }
    }

    return returnVal;
  }

  $(document).ready(function () {
    // stop enter submitting form
    $(document).on('keypress', ':input:not(textarea):not([type="submit"])', function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
      }
    });

    $('#edit-name').val($.cookie('Drupal.visitor.from_name'));
    $('#edit-email').val($.cookie('Drupal.visitor.from_email'));
    $('div.field-name-field-tags').parent().insertAfter('.block-alq-mps');
    $('.suburb-search').autocomplete({
      source: function (request, response) {
        var searchTerm = request.term;
        $.getJSON('/alq-mps/' + searchTerm, function (data) {
          var modifedResponse = modifyResponse(data);
          response(modifedResponse);
        }).fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
        });
      },
      minLength: 3,
      select: function (event, ui) {
        event.preventDefault();
        // in case it was made invisible by the default user
        $('#edit-emailee-electorate').closest('div.form-group').show();
        var ac = ui.item.value.locality + ' - ' + ui.item.value.postcode;
        $('.suburb-search').val(ac);
        var results = getEmailees(ui.item.value.state_district, cache);
        showEmailees(results);
      },
      focus: function (event) {
        event.preventDefault();
      }
    });

    $('#alq-mps-email-form').submit(function (evt) {
      var body = $('#edit-body').val();
      // make it into one line so we can regex it
      var body = body.replace(/\n/g, '');
      var re = /^\[.+\]$/;
      var found = body.search(re);
      if (found !== -1) {
        evt.preventDefault();
        var modal = '<div class="modal fade" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title">Text of your email</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>Please modify the text of the email.  This multiplies the power of your message.</p>' +
            '<p>Make sure you remove the start and end characters as well, "[" and "]".</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $(modal).modal();
      }
    });
    $('#suburb-default').click(function () {
      // allow them to set and unset the default member
      var nid = $('#edit-emailee-nid');
      var defaultNid = $('#edit-emailee-default-nid');
      var name = $('#edit-emailee-name');
      var electorate = $('#edit-emailee-electorate');
      var electorateParent = electorate.closest('div.form-group');
      // unset
      if (nid.val() === defaultNid.val()) {
        name.val('');
        nid.val('');
        electorateParent.show();
      } else {
        // set
        name.val($('#edit-emailee-default-name').val());
        electorate.val('');
        $('#edit-suburb').val('');
        electorateParent.hide();
        nid.val(defaultNid.val());
      }

    });
  });
})(jQuery);
