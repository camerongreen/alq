(function ($) {

  /* Slideshow resize function */
  Drupal.theme.prototype.slideshowResizer = function (target) {
    var slideheight = 0;
    $(target + ' .views-slideshow-cycle-main-frame-row').each(function () {
      slideheight = $(this).find('.views-slideshow-cycle-main-frame-row-item').innerHeight();
      if (slideheight != 0) {
        $(target + ' .views-slideshow-cycle-main-frame').css('height', slideheight + 'px');
        $(target + ' .views-slideshow-cycle-main-frame-row').css('height', slideheight + 'px');
        return false;
      }
    });
  };
})(jQuery);
