/**
 * Donation form demo
 *
 * Note to run these you will need to ln -s docs/demo . in the public_html
 * directory
 */
var pageUrl = '/membership';

this.testAnnualRepeat = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#oneoff', 1000)
      .getValue('#t3', function (result) {
        this.assert.equal(result.value, 'M')
      })
      .click('#annual input')
      .getValue('#t3', function (result) {
        this.assert.equal(result.value, 'Y')
      })
      .end();
};

this.testOneoffAmountChanges = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#oneoff', 1000);

  browser.click('#oneoff');

  var types = {
    'Individual': 35,
    'Student/Unwaged': 25,
    'Family': 55,
    'Lifetime': 500
  };

  for (var i in types) {
    if (types.hasOwnProperty(i)) {
      browser.click('select[id="membershipType"] option[value="' + i + '"]')
      browser.expect.element('#membershipType').to.have.value.that.equals(i);
      browser.expect.element('#oneoffAmount input').to.have.value.that.equals(types[i]);
    }
  }
  browser.end();
};

this.testClickOneoffElements = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#oneoff', 1000);

  browser.click('#oneoff');
  browser.expect.element('#oneoffAmount input').to.be.selected;
  browser.expect.element('#amount1').to.not.be.visible;
  browser.expect.element('#oneoffAmount').to.be.visible;
  browser.expect.element('#annual').to.be.visible;
  browser.end();
};

this.testClickMonthlyElements = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#monthly', 1000);

  browser.click('#monthly');
  browser.expect.element('#amount2 input').to.be.selected;
  browser.expect.element('#amount1').to.be.visible;
  browser.expect.element('#oneoffAmount').to.not.be.visible;
  browser.expect.element('#annual').to.not.be.visible;
  browser.end();
};

this.testAmountOther = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#amountOther', 1000);
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
this.testClickMonthly = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#monthly', 1000);

  browser.expect.element('#oneoff input').to.be.selected;
  browser.expect.element('#monthly input').to.not.be.selected;
  browser.click('#monthly');
  browser.expect.element('#monthly input').to.be.selected;
  browser.expect.element('#oneoff input').to.not.be.selected;
  browser.end();
};

this.testAmountOtherMinimum = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#amountOther', 1000)
      .click('#amountOther')
      .waitForElementVisible('#amountOtherValue', 1000)
      .setValue('#amountOtherValue', '35')
      .click('#amountOther') // do this to move the focus
      .assert.elementNotPresent('div.has-error')
      .end();
};

this.testAmountOtherMinimumFail = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#amountOther', 1000)
      .click('#amountOther')
      .waitForElementVisible('#amountOtherValue', 1000)
      .setValue('#amountOtherValue', '34')
      .click('#amountOther') // do this to move the focus
      .assert.containsText('div.has-error', 'Monthly minimum is')
      .end();
};
