const axios = require('axios')
const constants = require('./constants')

const api = axios.create({
  baseURL: constants.server.apiUrl,
  timeout: 60000
})

const proxy = axios.create({
  baseURL: `${constants.server.proxyUrl}${constants.server.apiUrl}`
})

module.exports = {
  api,
  proxy
}
