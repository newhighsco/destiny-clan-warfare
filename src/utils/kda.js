const kda = (member, precision) => {
  precision = precision || 2

  var result = (member.kills + member.assists) / member.deaths
  var factor = Math.pow(10, precision)

  return Math.round(result * factor) / factor
}

module.exports = kda
