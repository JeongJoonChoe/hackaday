module.exports = {
    'Product Page Test' : function (client) {
      client
        .url('http://localhost:3000/projects/page/3')
        .waitForElementVisible('body', 1000)
        .assert.visible('input[type=text]')
        .pause(1000)
        .assert.containsText('.project-stats span',
          'Views')
        .end();
    }
  };