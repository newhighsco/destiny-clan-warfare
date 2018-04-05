const axios = require('axios')
const constants = require('./constants')

const bungie = axios.create({
  baseURL: constants.bungie.apiUrl,
  headers: {
    'X-API-Key': process.env.BUNGIE_API_KEY
  }
})

module.exports = bungie
