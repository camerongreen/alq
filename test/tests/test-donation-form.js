/**
 * Donation form demo
 *
 * Note to run these you will need to ln -s docs/demo . in the public_html directory
 */
var siteUrl = 'http://alq.test';
var pageUrl = siteUrl + '/donate-new';

this.testAmountOther = function (browser) {
  browser
    .url(pageUrl)
    .waitForElementVisible('#amountOther', 1000);
  browser.expect.element('#amountOtherValue').to.not.be.enabled;
  browser.expect.element('#amountOther input').to.not.be.selected;
  browser.click('#amountOther');
  browser.expect.element('#amountOther input').to.be.selected;
  browser.expect.element('#amountOtherValue').to.be.enabled;

  browser.setValue('#amountOtherValue', '50')
    .getValue('#amountOtherValue', function (result) {
      this.assert.equal(result.value, '50')
    })
    .end();
};

// with all this bootstrap magic going on, test trivial things
this.testClickMonthly = function (browser) {
  browser
    .url(pageUrl)
    .waitForElementVisible('#monthly', 1000);

  browser.expect.element('#oneoff input').to.be.selected;
  browser.expect.element('#monthly input').to.not.be.selected;
  browser.click('#monthly');
  browser.expect.element('#monthly input').to.be.selected;
  browser.expect.element('#oneoff input').to.not.be.selected;
  browser.end();
};

this.testMembershipVisible = function (browser) {
  browser
    .url(pageUrl)
    .waitForElementVisible('#monthly', 1000)
    .click('#monthly')
    .waitForElementVisible('#membership', 1000)
    .assert.containsText('#membership', 'complimentary membership')
    .end();
};

this.testAmountOtherMembershipEligible = function (browser) {
  browser
    .url(pageUrl)
    .waitForElementVisible('#amountOther', 1000)
    .click('#amountOther')
    .waitForElementVisible('#amountOtherValue', 1000);

  browser.expect.element('#amountOtherValue').to.be.enabled;

  browser.setValue('#amountOtherValue', '50')
    .click('#amountOther') // do this to move the focus
    .waitForElementVisible('#membership', 1000)
    .assert.containsText('#membership', 'complimentary membership')
    .end();
};

this.testAmountOtherMembershipIneligible = function (browser) {
  browser
    .url(pageUrl)
    .waitForElementVisible('#amountOther', 1000)
    .click('#amountOther')
    .waitForElementVisible('#amountOtherValue', 1000)
    .setValue('#amountOtherValue', '49')
    .click('#amountOther') // do this to move the focus
    .assert.hidden('#membership')
    .end();
};
