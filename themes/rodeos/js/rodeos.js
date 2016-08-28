(function ($) {
  $(document).ready(function () {
    // show others on click
    $('div.nav-tabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
    $('a.anke').on('click', function (event) {
      var target = $(this.hash);
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 80
        }, 1000);
      } else {
        document.location = '/' + this.hash;
      }
    });
  });

  $(window).scroll(function () {
    var zbw = $('#zone-branding-wrapper');
    if ($(document).scrollTop() > 0) {
      zbw.css({
        position: 'fixed',
      });
      zbw.stop().animate({
        'margin-top': '0px',
        'background-color': 'rgba(255, 255, 255, 0.9)'
      }, 300);
    } else {
      zbw.css({
        position: 'static'
      });
      zbw.stop().animate({
        'margin-top': '10px',
        'background-color': 'rgba(255, 255, 255, 0.6)'
      }, 300);
    }
  });
})(jQuery);