module.exports = (function () {
  const config = require('nconf')
  const nodemailer = require('nodemailer')
  const username = config.get('notifiersConfig:gmail:username')
  const password = config.get('notifiersConfig:gmail:password')
  const toEmail = config.get('notifiersConfig:gmail:email')
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: username,
      pass: password
    }
  })
  return {
    notify: function (video) {
      return new Promise(
        function (resolve, reject) {
          const mailOptions = {
            from: username,
            to: toEmail,
            subject: `New video exists \'${video.title}\' [season ${video.season},episode ${video.episode}] from \'${video.publisher}\'`,
            text: `New video exists \'${video.title}\' [season ${video.season},episode ${video.episode}] from \'${video.publisher}\',  \'${video.href}\'.`
          }

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            }
            resolve(undefined)
          })
        })
    }
  }
})()

