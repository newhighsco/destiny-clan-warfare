var apiStatus

try {
  apiStatus = require('../../public/api-status.json')
} catch (e) {
  apiStatus = {}
}

module.exports = () => ({ ...apiStatus })
