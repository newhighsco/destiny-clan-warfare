const axios = require('axios')
const constants = require('./constants')

const api = (index = 0) =>
  axios.create({
    baseURL: url(index),
    timeout: 120000
  })

const proxy = () => {
  return axios.create({
    baseURL: constants.server.proxyUrl
  })
}

const url = (index = 0, url = null) => {
  const { protocol, subdomains, domain, path } = constants.server.apiUrl
  index = Math.min(Math.max(0, index), subdomains.length - 1)

  return `${protocol}${subdomains[index]}${domain}${url || path}`
}

const proxyOptions = {
  target: url(),
  pathRewrite: { [`^${constants.server.proxyUrl}`]: '' },
  changeOrigin: true,
  secure: false
}

module.exports = {
  api,
  proxy,
  proxyOptions,
  url
}
