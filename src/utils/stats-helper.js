const constants = require('./constants')

const round = (result, precision) => {
  const factor = Math.pow(10, precision)

  return Math.round(result * factor) / factor
}

const kd = (stats, precision) => {
  return kda(stats, precision, true)
}

const kda = (stats, precision, excludeAssists) => {
  precision = precision || 2

  const deaths = Math.max(stats.deaths, 1)
  const assists = excludeAssists ? 0 : stats.assists
  const result = (stats.kills + assists) / deaths

  return round(result, precision)
}

const ppg = (stats, precision) => {
  precision = precision || 0

  const games = Math.max(stats.games, 1)
  const result = stats.score / games

  return round(result, precision)
}

const percentage = (current, total, limit, precision) => {
  precision = precision || 0

  var result = (current / total) * 100

  if (limit) result = Math.max(0, Math.min(result, 100))

  return round(result, precision)
}

const ranking = (rank) => {
  return `${constants.prefix.hash}${rank}`
}

const shortNumber = (value, precision) => {
  if (typeof value !== 'number') return value
  if (value > 1e19) return value
  if (value < -1e19) return value
  if (Math.abs(value) < 1000) return value

  var sign = value < 0 ? '-' : ''

  var suffixes = [
    { label: 'K', exponent: 6, precision: 1 },
    { label: 'M', exponent: 9, precision: 2 },
    { label: 'B', exponent: 12, precision: 3 },
    { label: 'T', exponent: 16, precision: 4 }
  ]

  value = Math.abs(value)

  const size = Math.floor(value).toString().length
  const exponent = size % 3 === 0 ? size - 3 : size - (size % 3)
  const suffix = suffixes.find(suffix => exponent < suffix.exponent)
  const shortNumber = round(value / Math.pow(10, exponent), suffix.precision)

  return `${sign}${shortNumber}${suffix.label}`
}

module.exports = {
  kd,
  kda,
  ppg,
  percentage,
  ranking,
  shortNumber
}
