const axios = require('axios')
const constants = require('./constants')
const urlBuilder = require('./url-builder')

const api = (url = constants.bungie.baseUrl) =>
  axios.create({
    baseURL: `${url}Platform/`,
    headers: {
      'X-API-Key': process.env.BUNGIE_API_KEY
    }
  })

const proxy = () => {
  return api(urlBuilder.bungieUrl())
}

const disabled = statusCode => {
  return constants.bungie.disabledStatusCodes.indexOf(statusCode) !== -1
}

module.exports = {
  api,
  proxy,
  disabled
}
