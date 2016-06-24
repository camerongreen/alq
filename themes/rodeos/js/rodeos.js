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
})(jQuery);