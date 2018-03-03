/**
 * Front page for ALQ
 */
module.exports = {
  'Check title': function (browser) {
    browser
        .url(browser.launch_url)
        .waitForElementVisible('body', 1000)
        .assert.containsText('h1', 'OUR LATEST NEWS')
        .end();
  },
  'Check footer year current': function (browser) {
    var date = new Date();
    browser
        .url(browser.launch_url)
        .waitForElementVisible('body', 1000)
        .assert.containsText('#section-footer', 'Animal Liberation Queensland ' + date.getFullYear())
        .end();
  }
};
