/**
 * @file
 * Functions to support the alp mps application.
 */

(($) => {
  let cache = []; // eslint-disable-line prefer-const

  /**
   * Show emailees.
   *
   * Takes a list of emailees (currently just one)
   * and add them to the form.
   s
   * @param {Array} emailees
   *   Emails to show (first of).
   */
  function showEmailees(emailees) {
    const emailee = emailees.shift();

    $('#edit-emailee-name').val(emailee.title);
    $('#edit-emailee-electorate').val(emailee.state_district);
    $('#edit-emailee-nid').val(emailee.nid);

    const regex = /^Dear [^,]+,/;

    if (emailee.title) {
      $('#edit-body').val($('#edit-body').val().replace(regex, 'Dear ' + emailee.title + ','));
    }
  }

  /**
   * Check if the current value is in the cache.
   *
   * @param {mixed} data
   *   Data to check.
   *
   * @return {boolean}
   *   Return if data is in the cache.
   */
  function inCache(data) {
    const stringData = JSON.stringify(data);
    for (let i = 0, l = cache.length; i < l; i++) {
      if (stringData === JSON.stringify(cache[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Take the JSON response and format it for the jQuery autocomplete.
   *
   * @param {mixed} data
   *   Data to modify.
   *
   * @return {Array}
   *   Reformatted response.
   */
  function modifyResponse(data) {
    let returnVal = []; // eslint-disable-line prefer-const
    // Only want each suburb to appear once.
    let seen = []; // eslint-disable-line prefer-const

    for (let i = 0, l = data.length; i < l; i++) {
      const ac = `${data[i].locality} - ${data[i].postcode} (State District: ${data[i].state_district})`;

      if (!inCache(data[i])) {
        cache.push(data[i]);
      }

      if (seen.indexOf(ac) === -1) {
        returnVal.push({
          label: ac,
          value: data[i],
        });
        seen.push(ac);
      }
    }

    return returnVal;
  }

  /**
   * Find all the emailees which correspond the current district.
   *
   * @param {String} stateDistrict
   *   District to look for.
   * @param {Array} data
   *   Data to look within.
   *
   * @return {Array}
   *   Emailess for district.
   */
  function getEmailees(stateDistrict, data) {
    let returnVal = []; // eslint-disable-line prefer-const
    let nids = []; // eslint-disable-line prefer-const

    for (let i = 0, l = data.length; i < l; i++) {
      const place = data[i];
      if ((place.state_district === stateDistrict) && (nids.indexOf(place.nid) === -1)) {
        returnVal.push(place);
        nids.push(place.nid);
      }
    }

    return returnVal;
  }

  $(document).ready(() => {
    // Stop enter submitting form.
    $(document).on('keypress', ':input:not(textarea):not([type="submit"])', (event) => {
      if (event.keyCode == 13) { // eslint-disable-line eqeqeq
        event.preventDefault();
      }
    });

    const fromName = $.cookie('Drupal.visitor.from_name');
    if (fromName) {
      $('#edit-name').val(fromName);
    }
    const fromEmail = $.cookie('Drupal.visitor.from_email');
    if (fromEmail) {
      $('#edit-email').val(fromEmail);
    }
    $('div.field-name-field-tags').parent().insertAfter('.block-alq-mps');
    $('.suburb-search').autocomplete({
      source: (request, response) => {
        const searchTerm = request.term;
        $.getJSON(`/alq-mps/${searchTerm}`, (data) => {
          const modifedResponse = modifyResponse(data);
          response(modifedResponse);
        }).fail((jqxhr, textStatus, error) => {
          const err = `${textStatus} ${error}`;
          console.log(`Request Failed: ${err}`); // eslint-disable-line
                                                 // no-console
        });
      },
      minLength: 3,
      select: (event, ui) => {
        event.preventDefault();
        // in case it was made invisible by the default user
        $('#edit-emailee-electorate').closest('div.form-group').show();
        const ac = `${ui.item.value.locality} - ${ui.item.value.postcode}`;
        $('.suburb-search').val(ac);
        const results = getEmailees(ui.item.value.state_district, cache);
        showEmailees(results);
      },
      focus: (event) => {
        event.preventDefault();
      },
    });

    $('#alq-mps-email-form').submit((evt) => {
      let body = $('#edit-body').val();
      // make it into one line so we can regex it
      body = body.replace(/\n/g, '');
      const re = /^[.+]$/;
      const found = body.search(re);
      if (found !== -1) {
        evt.preventDefault();
        const modal = '<div class="modal fade" tabindex="-1" role="dialog">' +
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
    $('#suburb-default').click(() => {
      // allow them to set and unset the default member
      const nid = $('#edit-emailee-nid');
      const defaultNid = $('#edit-emailee-default-nid');
      const name = $('#edit-emailee-name');
      const electorate = $('#edit-emailee-electorate');
      const electorateParent = electorate.closest('div.form-group');
      // unset
      if (nid.val() === defaultNid.val()) {
        name.val('');
        nid.val('');
        electorateParent.show();
      }
      else {
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
