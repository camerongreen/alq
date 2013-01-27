(function($){
  "use strict";

  $(document).ready(function () {
    $(".view-slideshow").hover(function () {
      $(".views-slideshow-controls-text span:not(:eq(1))").fadeIn();
    },
    function () {
      $(".views-slideshow-controls-text span:not(:eq(1))").fadeOut();
    });
  });

})(jQuery);
