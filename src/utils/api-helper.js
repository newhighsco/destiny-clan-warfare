const axios = require('axios')
const constants = require('./constants')

const api = (index = 0) => axios.create({
  baseURL: url(index),
  timeout: 60000
})

const proxy = (index = 0) => axios.create({
  baseURL: `${constants.server.proxyUrl}${url(index)}`
})

const url = (index = 0, url = null) => {
  const { protocol, subdomains, domain, path } = constants.server.apiUrl

  return `${protocol}${subdomains[index]}${domain}${url || path}`
}

module.exports = {
  api,
  proxy,
  url
}
