(function ($) {
  $(window).on('load', function () {
    $('div.field-type-image div.field-items').after('<ul id="slide-nav">').cycle({
      fx: 'fade',
      speed: 'slow',
      pager: '#slide-nav',
      slideResize: true,
      containerResize: true,

      // callback fn that creates a thumbnail to use as pager anchor
      pagerAnchorBuilder: function (idx, slide) {
        var img = $(slide).find('img')[0];
        return '<li><a href="#"><img class="img-thumbnail" src="' + img.src + '" /></a></li>';
      }
    });

    $('.img-thumbnail').click(function () {
      $('div.field-type-image div.field-items').cycle('pause');
    });
  });
})(jQuery);
