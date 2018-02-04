/**
 * Front page for ALQ
 */
var siteUrl = 'http://localhost';

module.exports = {
  'Check title': function (browser) {
    browser
        .url(siteUrl)
        .waitForElementVisible('body', 1000)
        .assert.containsText('h1', 'ANIMAL LIBERATION QUEENSLAND')
        .end();
  },
  'Check footer year current': function (browser) {
    var date = new Date();
    browser
        .url(siteUrl)
        .waitForElementVisible('body', 1000)
        .assert.containsText('#section-footer', 'Animal Liberation Queensland ' + date.getFullYear())
        .end();
  }
};
