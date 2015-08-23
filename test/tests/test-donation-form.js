/**
 * Donation form demo
 */
var siteUrl = 'http://alq.test';

module.exports = {
  'Test membership options come up when monthly selected' : function (browser) {
    browser
      .url(siteUrl + '/demo/index.html')
      .waitForElementVisible('body', 1000)
      .click('#monthly')
      .waitForElementVisible('#membership', 1000)
      .assert.containsText('#membership', 'complimentary membership')
      .end();
  }
};
