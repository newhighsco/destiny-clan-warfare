const axios = require(`axios`)
const constants = require('./constants')

const api = axios.create({
  baseURL: constants.server.apiUrl
})

module.exports = api
