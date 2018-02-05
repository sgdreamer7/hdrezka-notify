const app = require('./app');

(async () => {
  await app.start()
  process.exit(0)
})()
