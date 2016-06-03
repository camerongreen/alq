/**
 * Functions to support the alp mps application
 */
(function ($) {
  function drawChart() {
    var emails = Drupal.settings.alq_mps.emails;

    var stats = [];

    for (var i = 0, l = emails.length; i < l; i++) {
      var date = new Date(emails[i].created * 1000);
      var displayDate = date.getFullYear() + '-' + (date.getMonth() + 1);
      var sent = emails[i].status === Drupal.settings.alq_mps.ALQ_EMAIL_SUCCESS_STATUS ? 1 : 0;
      var unsent = emails[i].actioned === null ? 1 : 0;
      var error = !unsent && !sent ? 1 : 0;

      // check if the last element of stats starts with the current
      // displayDate, if it does, increment things, otherwise
      // add a new row
      if ((stats.length === 0) || (stats[stats.length - 1][0] !== displayDate)) {
        stats.push([
          displayDate,
          1,
          sent,
          unsent,
          error
        ]);
      } else {
        stats[stats.length - 1][1]++;
        stats[stats.length - 1][2] += sent;
        stats[stats.length - 1][3] += unsent;
        stats[stats.length - 1][4] += error;
      }
    }

    // add headers
    stats.unshift(['Month', 'Total', 'Sent', 'Unsent', 'Errors']);
    var data = google.visualization.arrayToDataTable(stats);

    var options = {
      chart: {
        title: 'Email statistics'
      }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('graph'));

    chart.draw(data, options);
  }

  // go...
  $(document).ready(function () {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // nl2br for email content
    var field = $('div.field-name-field-body div.field-item');
    var fieldText = field.text();
    field.html(fieldText.replace("\n", '<br>'));
  });

})(jQuery);
