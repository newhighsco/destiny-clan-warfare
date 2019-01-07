const axios = require('axios')
const constants = require('./constants')

const api = (index = 0) => axios.create({
  baseURL: url(index),
  timeout: 120000
})

const proxy = () => {
  const proxyUrls = JSON.parse(process.env.ENABLE_PROXY_URLS || false)

  return axios.create({
    baseURL: proxyUrls ? constants.server.proxyUrl : `https://proxy.destinyclanwarfare.com/${url()}`
  })
}

const url = (index = 0, url = null) => {
  const { protocol, subdomains, domain, path } = constants.server.apiUrl
  index = Math.min(Math.max(0, index), subdomains.length - 1)

  return `${protocol}${subdomains[index]}${domain}${url || path}`
}

module.exports = {
  api,
  proxy,
  url
}
