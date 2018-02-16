const kda = (member, excludeAssists, precision) => {
  precision = precision || 2

  const deaths = member.deaths > 0 ? member.deaths : 1
  const assists = !excludeAssists ? member.assists : 0
  const result = (member.kills + assists) / deaths
  const factor = Math.pow(10, precision)

  return Math.round(result * factor) / factor
}

module.exports = kda
