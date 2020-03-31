/**
 * Fancy search thing.
 */
(($) => {
  $(document).ready(() => {
    let searchLink = $('.menu-path-search');
    let searchBlock = $('#block-search-form');

    $(searchLink).click(() => {
      $(searchBlock).slideToggle();
      return false;
    });

  });
})
(jQuery);
