const proxy = require('http-proxy-middleware')
const constants = require('../src/utils/constants')
const apiHelper = require('../src/utils/api-helper')

module.exports = function expressMiddleware(router) {
  router.use(constants.server.proxyUrl, proxy(apiHelper.proxyOptions()))
}
