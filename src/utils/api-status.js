var apiStatus

try {
  apiStatus = require.resolve('../../public/api-status.json')
} catch (e) {
  apiStatus = {}
}

module.exports = () => ({ ...apiStatus })
