(function($){
  "use strict";
  $(document).ready(function () {

    $(".views-slideshow-controls-text span").hide();

    $(".view-slideshow").hover(function () {
      $(".views-slideshow-controls-text span:not(:eq(1))").fadeIn();
    },
    function () {
      $(".views-slideshow-controls-text span:not(:eq(1))").fadeOut();
    });

    $('#search-block-form input[type=text]').attr('placeholder', 'Keyword');
    $('#webform-client-form-114 input[type=email]').attr('placeholder', 'Your email');
  });

})(jQuery);
