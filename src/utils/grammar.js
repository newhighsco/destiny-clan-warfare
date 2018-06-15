const Autolinker = require('autolinker')
const linkOptions = {
  mention: 'twitter'
}

const description = (s) => {
  return Autolinker.link(s, linkOptions).split(/\r?\n/g).join('<br />')
}

const possessive = (s) => {
  return s ? (s + (s.substr(-1) === 's' ? '\'' : '\'s')) : s
}

const sentence = (a) => {
  return a ? a.sort().join(', ').replace(/,(?!.*,)/g, ' &') : ''
}

module.exports = {
  description,
  possessive,
  sentence
}
