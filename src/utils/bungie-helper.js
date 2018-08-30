const axios = require('axios')
const constants = require('./constants')

const api = axios.create({
  baseURL: constants.bungie.apiUrl,
  headers: {
    'X-API-Key': process.env.BUNGIE_API_KEY
  }
})

const disabled = (statusCode) => {
  return constants.bungie.disabledStatusCodes.indexOf(statusCode) !== -1
}

module.exports = {
  api,
  disabled
}
