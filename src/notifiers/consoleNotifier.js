module.exports = {
  notify: function (video) {
    return new Promise(
      function (resolve, reject) {
        console.log(`New video exists \'${video.title}\' [season ${video.season},episode ${video.episode}] from \'${video.publisher}\'`)
        resolve(undefined)
      }
    )

  }
}
