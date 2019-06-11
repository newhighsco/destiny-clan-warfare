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
  const totals = { total: -1 }
  const parseMedal = (medal, type) => ({
    id: medal.id || medal.medalId || medal.unlockId,
    type,
    tier: medal.tier || medal.medalTier || 1,
    name: medal.name,
    description: medal.description,
    count: medal.count || 1,
    label:
      medal.awardedTo && medal.awardedTo.length
        ? [decode(medal.awardedTo)]
        : undefined
  })

  if (input) {
    input.map(medal => {
      const parsed = parseMedal(medal, type)
      const existing = medals.find(
        ({ id, type }) => id === parsed.id && type === parsed.type
      )

      if (parsed.tier <= minimumTier) return

      if (parsed.count > 0) {
        totals[parsed.tier] = (totals[parsed.tier] || 0) + parsed.count
        totals.total = Math.max(0, totals.total) + parsed.count
      }

      if (existing) {
        existing.label = Array.isArray(existing.label)
          ? [
              ...existing.label,
              ...parsed.label.filter(item => !~existing.label.indexOf(item))
            ]
          : parsed.label
      } else {
        medals.push(parsed)
      }
    })
  }

  return {
    medals: medals.map(({ type, tier, name, description, count, label }) => ({
      type,
      tier,
      name,
      description,
      count,
      label
    })),
    totals
  }
}

module.exports = {
  build,
  parseMedals
}
