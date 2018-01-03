const kda = (member, precision) => {
  precision = precision || 2

  const deaths = member.deaths > 0 ? member.deaths : 1
  const result = (member.kills + member.assists) / deaths
  const factor = Math.pow(10, precision)

  return Math.round(result * factor) / factor
}

module.exports = kda
