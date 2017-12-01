const possessive = (s) => {
  return s ? (s + (s.substr(-1) === 's' ? '\'' : '\'s')) : s
}

module.exports = possessive
