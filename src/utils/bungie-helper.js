const axios = require('axios')
const constants = require('./constants')

const api = (url = constants.bungie.baseUrl) => axios.create({
  baseURL: `${url}Platform/`,
  headers: {
    'X-API-Key': process.env.BUNGIE_API_KEY
  }
})

const proxy = () => {
  const proxyUrls = JSON.parse(process.env.ENABLE_PROXY_URLS)
  const url = proxyUrls ? constants.bungie.proxyUrl : constants.bungie.baseUrl

  return api(url)
}

const disabled = (statusCode) => {
  return constants.bungie.disabledStatusCodes.indexOf(statusCode) !== -1
}

module.exports = {
  api,
  proxy,
  disabled
}
