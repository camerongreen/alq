/**
 * Fancy search thing.
 */
(($) => {
  $(document).ready(() => {
    let searchLink = $('.menu-path-search');
    let searchBlock = $('#block-search-form');

    $(searchLink).click(() => {
      $(searchBlock).slideToggle("slow", function() {
        if ($(this).is(':visible'))
        {
          $(searchBlock).find('input[type="text"]').focus();
        }
      });
      return false;
    });

  });
})
(jQuery);
