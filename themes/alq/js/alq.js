(function($){
  "use strict";
  $(document).ready(function () {
    $("body.front .views-slideshow-controls-text span").hide();

    $('#search-block-form input[type=text]').attr('placeholder', 'Search');
    $('#webform-client-form-114 input[type=email]').attr('placeholder', 'Your email');

    // Mobile
    if (!$("#block-facebook-boxes-fb-like:visible").length) {
    }


    $(".view-news .views-field-field-image img").addClass("img-polaroid");

    // desktop
    if ($("#block-facebook-boxes-fb-like:visible").length) {
      $("body.front .view-slideshow").hover(function () {
        $(".views-slideshow-controls-text span:not(:eq(1))").fadeIn();
      },
      function () {
        $(".views-slideshow-controls-text span:not(:eq(1))").fadeOut();
      });
    }
  });
})(jQuery);
