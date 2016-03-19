/**
 * Functions to support the alp mps application
 */
(function ($) {
  $(document).ready(function () {

    var cache = {};
    $('#edit-suburb').autocomplete({
      source: function (request, response) {
        if (request.term in cache) {
          response(cache[request.term]);
          return;
        }
        $.getJSON('/alq-mps/' + request.term, function (data, status, xhr) {
          cache[request.term] = data;
          response(data);
        });
      },
      minLength: 3,
      select: function (event, ui) {
        console.log(ui.item ?
        'Selected: ' + ui.item.value + ' aka ' + ui.item.id :
        'Nothing selected, input was ' + this.value);
      }
    });
  });
})(jQuery);
