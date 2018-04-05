const crypto = require('crypto')

const createContentDigest = content => {
  return crypto
    .createHash('md5')
    .update(JSON.stringify(content))
    .digest('hex')
}

module.exports = createContentDigest
