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
  precision = precision || 2

  const games = Math.max(stats.games, 1)
  const result = stats.score / games

  return round(result, precision)
}

module.exports = {
  kd,
  kda,
  ppg
}
