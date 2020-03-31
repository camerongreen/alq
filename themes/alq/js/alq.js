(function($){
  "use strict";

  // Fix for https://stackoverflow.com/questions/14923301/uncaught-typeerror-cannot-read-property-msie-of-undefined-jquery-tools
  jQuery.browser = {};
  (function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
      jQuery.browser.msie = true;
      jQuery.browser.version = RegExp.$1;
    }
  })();

  $(document).ready(function () {
    $('#webform-client-form-114 input[type=email]').attr('placeholder', 'Your email');

    // Slideshow controls..
    $("body.front .views-slideshow-controls-text span").hide();

    if ($("body.front").length) {
      $("body.front .view-slideshow").hover(function () {
        $(".views-slideshow-controls-text span:not(:eq(1))").fadeIn();
      },
      function () {
        $(".views-slideshow-controls-text span:not(:eq(1))").fadeOut();
      });
    }
  });
})(jQuery);
