const log4js = require('log4js')
const log = log4js.getLogger('01_mongoose.js')
const config = require('nconf')

const mongoose = require('mongoose')
const requireTree = require('require-tree')

requireTree('../../models/')

module.exports = async function () {

  mongoose.connection.on('open', function () {
    log.info('Connected to mongodb server.')
  })

  mongoose.Promise = Promise
  const db = await mongoose.connect(config.get('mongoose:db'), { useMongoClient: true, })
  log.info('Started connection on ' + (config.get('mongoose:db')) + ', waiting for it to open...')
  return db
}
