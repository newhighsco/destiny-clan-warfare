const encode = str => {
  var buf = []

  for (var i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
  }

  return buf.join('')
}

const decode = str => {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec)
  })
}

module.exports = {
  encode,
  decode
}
