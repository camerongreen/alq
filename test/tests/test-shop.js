/**
 * Test the shop functions.
 */
var pageUrl = '/shop';

this.testAddToCart = function (browser) {
  var siteUrl = browser.launch_url;
  browser
      .url(siteUrl + '/' + pageUrl);
  browser.useXpath();
  browser.click('//a[text()="Apparel"]');
  browser.click('//a[text()="ALQ Hoodie"]');
  browser.useCss();
  browser.click('select[id="edit-attributes-38"] option[value="129"]')
  var price = null;
  browser.getText('span.uc-price', function (result) {
    price = result.value.substr(1);
    browser.clearValue('#edit-qty');
    browser.setValue('#edit-qty', '2');
    browser.click('#edit-actions .form-submit');
    browser.assert.urlContains('/cart');
    browser.click('#edit-checkout--2');
    browser.expect.element('td.subtotal span.uc-price').text.to.equal('$' + (2 * price).toFixed(2));
    browser.end();
  });
};

