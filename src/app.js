const mongoose = require('mongoose')

const log4js = require('log4js')
const log = log4js.getLogger('01_mongoose.js')

const app = {}

app.start = async function () {
  await require('./setup/initializers/00_generic')()
  const db = await require('./setup/initializers/01_mongoose')()
  log.info('Hdrezka-notify application started.')
  const videos = require('./videos')
  const config = require('nconf')
  try {
    await videos.fetchVideoData()
    await db.doClose()
  } catch (exception) {
  }
}

function handleErrors(fn) { return (...params) => fn(...params).catch(err => console.log(err)) }

module.exports = app
