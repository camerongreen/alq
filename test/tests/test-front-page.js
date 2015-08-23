/**
 * Front page for ALQ
 */
var siteUrl = 'http://alq.test';

module.exports = {
  'Check footer year current' : function (browser) {
    var date = new Date();
    browser
      .url(siteUrl)
      .waitForElementVisible('body', 1000)
      .assert.containsText('#section-footer', 'Animal Liberation Queensland ' + date.getFullYear())
      .end();
  }
};
