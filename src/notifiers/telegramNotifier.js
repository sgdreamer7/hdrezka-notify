const { apikey, chatid } = require('../telegram.api.keys')

module.exports = {
  notify: function (video) {
    return new Promise(
      function (resolve, reject) {
        const http = require('request')
        const message = encodeURI(`New video exists \'${video.title}\' [season ${video.season},episode ${video.episode}] from \'${video.publisher}\', \'${video.href}\'`)
        const url = `https://api.telegram.org/bot${apikey}/sendMessage?chat_id=${chatid}&parse_mode=html&text=${message}`
        http.post(url, function (error, response, body) {
          resolve(undefined)
        })
      }
    )
  }
}
