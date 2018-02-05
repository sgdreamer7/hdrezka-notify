module.exports = (function () {
  const config = require('nconf')
  const notifiers = config.get('notifiers').map(function (notifierType) {
    const notifierName = `./${notifierType}Notifier`
    return require(notifierName)
  })
  return {
    notify: async function (video) {
      await Promise.all(notifiers.map(async (notifier) =>
        await notifier.notify(video)
      ))
    }
  }
})()
