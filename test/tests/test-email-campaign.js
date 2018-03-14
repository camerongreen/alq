/**
 * Donation form demo
 *
 * Note to run these you will need to ln -s docs/demo . in the public_html
 * directory
 */
var pageUrl = '/ban-greyhound-racing';


this.testDefaultMinister = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementVisible('#edit-suburb', 1000);

  browser.click('#suburb-default');
  browser.expect.element('#edit-emailee-name').value.to.equal('Hon Annastacia Palaszczuk');
  browser.expect.element('#edit-emailee-electorate').to.not.be.visible;
  browser.end();
};


this.testSearchBySuburb = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl)
      .waitForElementPresent('ul.ui-autocomplete', 1000);

  browser.expect.element('h1').text.to.equal('BAN GREYHOUND RACING IN QUEENSLAND');
  browser.expect.element('ul.ui-autocomplete').to.not.be.visible;
  browser.setValue('#edit-suburb', 'Highgate');
  browser.expect.element('ul.ui-autocomplete').to.be.visible;
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
      .url(siteUrl + '/' + pageUrl)
      .waitForElementPresent('ul.ui-autocomplete', 1000);

  browser.expect.element('h1').text.to.equal('BAN GREYHOUND RACING IN QUEENSLAND');
  browser.expect.element('ul.ui-autocomplete').to.not.be.visible;
  browser.setValue('#edit-suburb', '4101');
  browser.expect.element('ul.ui-autocomplete').to.be.visible;
  browser.waitForElementVisible('ul.ui-autocomplete li', 30000);
  browser.expect.element('ul.ui-autocomplete li a').text.to.contain('HIGHGATE HILL');
  browser.click('ul.ui-autocomplete li a');
  browser.expect.element('#edit-emailee-name').value.to.equal('Hon Jacklyn Trad');
  browser.expect.element('#edit-emailee-electorate').value.to.equal('SOUTH BRISBANE');
  browser.end();
};
