/**
 * Test the donation form.
 */
var pageUrl = '/donate';

this.testAmountOther = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#donationForm', 500);

  browser.expect.element('#amountOtherValue').to.not.be.enabled;
  browser.expect.element('#amountOther input').to.not.be.selected;
  browser.click('#amountOther');
  browser.expect.element('#amountOther input').to.be.selected;
  browser.expect.element('#amountOtherValue').to.be.enabled;

  browser.setValue('#amountOtherValue', '50')
      .click('#amountOther')
      .getValue('#amount', function (result) {
        this.assert.equal(result.value, '50')
      })
      .end();
};

// with all this bootstrap magic going on, test trivial things
this.testClickDonationType = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#monthly', 500);

  browser.expect.element('#oneoff input').to.be.selected;
  browser.expect.element('#annual input').to.not.be.selected;
  browser.expect.element('#monthly input').to.not.be.selected;
  browser.click('#monthly');
  browser.expect.element('#monthly input').to.be.selected;
  browser.expect.element('#annual input').to.not.be.selected;
  browser.expect.element('#oneoff input').to.not.be.selected;

  browser.getValue('#t3', function (result) {
    this.assert.equal(result.value, 'M')
  });

  browser.click('#annual');
  browser.expect.element('#annual input').to.be.selected;
  browser.expect.element('#monthly input').to.not.be.selected;
  browser.expect.element('#oneoff input').to.not.be.selected;

  browser.getValue('#t3', function (result) {
    this.assert.equal(result.value, 'Y')
  });

  browser.end();
};

this.testAmountOtherMinimum = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#amountOther', 500)
      .click('#amountOther')
      .waitForElementVisible('#amountOtherValue', 500)
      .setValue('#amountOtherValue', '1')
      .click('#amountOther') // do this to move the focus
      .assert.containsText('div.has-error', 'Please specify at least')
      .end();
};
