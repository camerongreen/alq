/**
 * Functions to support the alp mps application
 */
(function ($) {
  $(document).ready(function () {
    var cache = [];

    function showEmailees(emailees) {
      var emailee = emailees.shift();

      $('#edit-emailee-name').val(emailee.title);
      $('#edit-emailee-electorate').val(emailee.state_district);
      $('#edit-emailees').val(emailee.nid);

      // if there is more than one email, we need to copy the above and add checkboxes for them to choose who to email
    }

    function inCache(data) {
      var stringData = JSON.stringify(data);
      for (var i = 0, l = cache.length; i < l; i++) {
        if (stringData === JSON.stringify(cache[i])) {
          return true;
        }
      }
      return false;
    }

    function modifyResponse(data) {
      var returnVal = [];
      var seen = []; // only want each suburb to appear once

      for (var i = 0, l = data.length; i < l; i++) {
        var ac = data[i].locality + ' - ' + data[i].postcode + ' (' + data[i].state_district + ')';

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

    $('#edit-suburb').autocomplete({
      source: function (request, response) {
        var searchTerm = request.term;
        $.getJSON('/alq-mps/' + searchTerm, function (data, status, xhr) {
          var modifedResponse = modifyResponse(data);
          response(modifedResponse);
        });
      },
      minLength: 3,
      select: function (event, ui) {
        event.preventDefault();
        var ac = ui.item.value.locality + ' - ' + ui.item.value.postcode;
        $('#edit-suburb').val(ac);
        var results = getEmailees(ui.item.value.state_district, cache);
        showEmailees(results);
      },
      focus: function (event, ui) {
        event.preventDefault();
      }
    });
  });
})
(jQuery);
