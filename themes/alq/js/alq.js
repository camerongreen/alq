(function ($) {
  "use strict";

  $(document).ready(function () {
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

    // Make views slideshow refresh itself on window resize.
    $(window).resize(function () {
      $('.views-slideshow-cycle-main-frame').each(function () {
        var heightNow = '';

        $(this).find('.views-slideshow-cycle-main-frame-row').each(function () {
          var thisDisplay = $(this).css('display');
          var thisHeight = $(this).find('img').height();
          if (thisDisplay == 'block') {
            heightNow = thisHeight;
          }
        });

        if (heightNow != '') {
          // set div height    = now image height.
          $(this).height(heightNow);
        }
      });
    });
  });
})(jQuery);
