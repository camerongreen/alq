/**
 * Donation form demo
 *
 * Note to run these you will need to ln -s docs/demo . in the public_html
 * directory
 */
var pageUrl = '/signium';


this.testDefaultMinister = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementVisible('#edit-emailee-name', 1000);

  browser.click('#suburb-default', function() {
    this.expect.element('#edit-emailee-electorate').to.not.be.visible;
    this.expect.element('#edit-emailee-name').to.have.value.that.equals('Hon Annastacia Palaszczuk');
  });
  browser.end();
};


this.testSearchBySuburb = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementPresent('ul.ui-autocomplete', 1000);

  browser.expect.element('h1').text.to.equal('Ban greyhound racing in Queensland');
  browser.expect.element('ul.ui-autocomplete').to.be.present;
  browser.setValue('#edit-suburb', 'Highgate')
  browser.waitForElementVisible('ul.ui-autocomplete li a', 30000);
  browser.expect.element('ul.ui-autocomplete li a').text.to.contain('HIGHGATE HILL');
  browser.click('ul.ui-autocomplete li a');
  browser.expect.element('#edit-emailee-name').value.to.equal('Hon Jacklyn Trad');
  browser.expect.element('#edit-emailee-electorate').value.to.equal('SOUTH BRISBANE');
  browser.end();
};


this.testSearchByPostcode = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + pageUrl)
      .waitForElementPresent('ul.ui-autocomplete', 1000);

  browser.expect.element('h1').text.to.equal('Ban greyhound racing in Queensland');
  browser.expect.element('ul.ui-autocomplete').to.be.present;
  browser.expect.element('ul.ui-autocomplete').to.not.be.visible;
  browser.setValue('#edit-suburb', '4101');
  browser.waitForElementVisible('ul.ui-autocomplete li', 30000);
  browser.expect.element('ul.ui-autocomplete li a').text.to.contain('HIGHGATE HILL');
  browser.click('ul.ui-autocomplete li a');
  browser.expect.element('#edit-emailee-name').value.to.equal('Hon Jacklyn Trad');
  browser.expect.element('#edit-emailee-electorate').value.to.equal('SOUTH BRISBANE');
  browser.end();
};
