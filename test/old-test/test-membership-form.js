/**
 * Tests for the membership form.
 *
 * These have been deprecated.
 */
var pageUrl = '/membership';

this.testAmountChanges = function (browser) {
  var siteUrl = browser.launch_url;
  var monthlyDonations = [5, 10, 15, 20, 30, 50, 100];
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#slider-values', 1000);

  for (var i in monthlyDonations) {
    if (monthlyDonations.hasOwnProperty(i)) {
      browser.click('#slider-values li.value-' + monthlyDonations[i])
      browser.expect.element('#amount').to.have.value.that.equals('' + monthlyDonations[i]);
    }
  }
  browser.end();
};

this.testAmountOther = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#amountOther', 1000);

  browser.expect.element('#slider').to.be.enabled;

  browser.setValue('#amountOther', '50');
  browser.click('#slider');

  browser.getValue('#amount', function (result) {
        this.assert.equal(result.value, '50')
      })
      .end();
};

this.testAmountOtherMinimum = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#amountOther', 1000)
      .setValue('#amountOther', '35')
      .click('#slider') // do this to move the focus
      .assert.elementNotPresent('div.has-error')
      .end();
};

this.testAmountOtherMinimumFail = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#amountOther', 1000)
      .setValue('#amountOther', '3')
      .click('#slider') // do this to move the focus
      .assert.containsText('div.has-error', 'Must be numeric and the minimum')
      .end();
};
