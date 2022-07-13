/**
 * @file
 * Functions to support the alp mps application.
 */

(($) => {
  $(document).ready(() => {
    // Hide things.
    $('h1.page-title, h1.title, h2.block-title, .section-header, .section-footer, #breadcrumb, .block-addtoany').hide();
    // Remove some margins.
    $('.zone-content').css({
      margin: '1rem'
    })
  });
})(jQuery);
