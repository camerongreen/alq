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
        var ac = ui.item.value.locality + ' - ' + ui.item.value.postcode;
        $('.suburb-search').val(ac);
        var results = getEmailees(ui.item.value.state_district, cache);
        showEmailees(results);
      },
      focus: function (event) {
        event.preventDefault();
      }
    });
  });
})(jQuery);
