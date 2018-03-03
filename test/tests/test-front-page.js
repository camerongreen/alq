/**
 * Front page for ALQ
 */
module.exports = {
  'Check title': function (browser) {
    var siteUrl = browser.launch_url;
    browser
        .url(browser.siteUrl)
        .waitForElementVisible('body', 1000)
        .assert.containsText('h1', 'OUR LATEST NEWS')
        .end();
  },
  'Check footer year current': function (browser) {
    var siteUrl = browser.launch_url;
    var date = new Date();
    browser
        .url(siteUrl)
        .waitForElementVisible('body', 1000)
        .assert.containsText('#section-footer', 'Animal Liberation Queensland ' + date.getFullYear())
        .end();
  }
};
