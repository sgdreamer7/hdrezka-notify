module.exports = (function () {
  const config = require('nconf')
  const toEmail = config.get('notifiersConfig:email:email')
  const sendmail = require('sendmail')({
    logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    },
    silent: false
  })
  return {
    notify: function (video) {
      return new Promise(
        function (resolve, reject) {
          sendmail({
            from: 'hdrezka-notify@hdrezka-notify.com',
            to: toEmail,
            subject: `New video exists \'${video.title}\' [season ${video.season},episode ${video.episode}] from \'${video.publisher}\'`,
            html: `New video exists \'${video.title}\' [season ${video.season},episode ${video.episode}] from \'${video.publisher}\',  \'${video.href}\'.`
          }, function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
            resolve(undefined)
          });
        })
    }
  }
})()

