const possessive = (s) => {
  return s ? (s + (s.substr(-1) === 's' ? '\'' : '\'s')) : s
}

const sentence = (a) => {
  return a ? a.sort().join(', ').replace(/,(?!.*,)/g, ' &') : ''
}

module.exports = {
  possessive,
  sentence
}
