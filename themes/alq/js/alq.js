(function ($) {
  "use strict";

  $(document).ready(function () {
    // Observe mega menu and hide other icons in header.
    const meanBar = $('#block-nice-menus-1');

    // Things to hide.
    const hide = $('.social-media');

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if ($('.meanclose').length) {
            $(hide).hide();
          } else {
            setTimeout(() => {
              if ($('.meanclose').length === 0) {
                $(hide).show()
              }
            }, 500);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(meanBar.get(0), config);
    //observer.disconnect();


  });
})(jQuery);
