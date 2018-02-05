const config = require('nconf')
const log4js = require('log4js')
const log = log4js.getLogger('00_generic.js')

module.exports = async function () {

  await config.file({ 'file': require('path').resolve(process.argv[2]) })

}
