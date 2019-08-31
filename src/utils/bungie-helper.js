const axios = require('axios')
const constants = require('./constants')

const api = (proxy = true) =>
  axios.create({
    baseURL: `${
      proxy ? constants.bungie.proxyUrl : constants.bungie.baseUrl
    }Platform/`,
    headers: {
      'X-API-Key': process.env.BUNGIE_API_KEY
    }
  })

const disabled = statusCode => {
  return constants.bungie.disabledStatusCodes.indexOf(statusCode) !== -1
}

module.exports = {
  api,
  disabled
}
