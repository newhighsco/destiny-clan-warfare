const decode = require('./html-entities').decode

const numberToWords = require('number-to-words')
const sentenceCase = require('sentence-case')

const build = (rank, tier, division) => {
  var place
  var placeDescription

  if (typeof rank === 'string') {
    place = rank
    placeDescription = `in the ${place} of`
  } else {
    place = numberToWords.toWordsOrdinal(rank)
    placeDescription = `${place} place in`
  }

  return {
    tier: tier,
    name: `${sentenceCase(place)} ${division}`,
    description: `Finished ${placeDescription} a ${division} division event`
  }
}

const parseMedals = (input, type, minimumTier) => {
  minimumTier = minimumTier || 0
  const medals = []
  const totals = { total: 0 }
  const parseMedal = (medal, type) => ({
    id: medal.Id || medal.MedalId || medal.UnlockId,
    type,
    tier: medal.Tier || medal.MedalTier || 1,
    name: medal.Name,
    description: medal.Description,
    count: medal.Count || 1,
    label: [ decode(medal.AwardedTo || '') ]
  })

  if (input) {
    input.map(medal => {
      const parsed = parseMedal(medal, type)
      const existing = medals.find(({ id, type }) => id === parsed.id && type === parsed.type)

      if (parsed.tier <= minimumTier) return

      totals[parsed.tier] = totals[parsed.tier] + parsed.count
      totals.total += parsed.count

      if (existing) {
        existing.label = existing.label.concat(parsed.label)
      } else {
        medals.push(parsed)
      }
    })
  }

  return { medals, totals }
}

module.exports = {
  build,
  parseMedals
}
