const searchWidget = '.c-searchwidget'
const options = { threshold: 0.1 }

module.exports = {
  after: browser => {
    browser.end();
  },

  'Initial render': function (browser) {
    browser
      .url('https://master.d2gmsl132ygn91.amplifyapp.com')
      .waitForElementVisible('body')
      .assert.screenshotIdenticalToBaseline(searchWidget, 'Search Widget', options)
  },

  'Enter a single character in the input element': function (browser) {
    browser
      .setValue('#pick-up-location', 'L')
      .assert.screenshotIdenticalToBaseline(searchWidget, 'Single Character', options)
  },

  'Enter a multiple characters in the input element': function (browser) {
    browser
      .setValue('#pick-up-location', 'ondon')
      .waitForElementVisible('.c-search-results')
      .assert.screenshotIdenticalToBaseline(searchWidget, 'Multiple Characters', options)
  },

  'On blur should hide the results drop down': function (browser) {
    browser
      .click('.c-searchwidget__title')
      .assert.screenshotIdenticalToBaseline(searchWidget, 'Hide Results', options)
  },
};