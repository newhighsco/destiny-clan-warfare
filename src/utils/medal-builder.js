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

const embellishLeaderboard = (leaderboard, division) => {
  return leaderboard.map(item => {
    var medal = { tier: 0 }

    switch (item.rank) {
      case '#1':
        medal = build(1, 2, division)
        break
      case '#2':
      case '#3':
        medal = build('top 3', 1, division)
        break
    }

    return {
      ...item,
      medal: medal
    }
  })
}

const parseMedals = (input, type, minimumTier) => {
  minimumTier = minimumTier || 0
  const output = []
  const parseMedal = (medal, type) => {
    return {
      id: medal.id || medal.medalId || medal.unlockId,
      type: type,
      tier: medal.tier || medal.medalTier || 1,
      name: medal.name,
      description: medal.description,
      count: medal.count || null,
      label: [ medal.awardedTo ] || []
    }
  }

  input.map(medal => {
    const parsed = parseMedal(medal, type)
    const existing = output.find(({ id, type }) => id === parsed.id && type === parsed.type)

    if (parsed.tier <= minimumTier) return

    if (existing) {
      existing.label = existing.label.concat(parsed.label)
    } else {
      output.push(parsed)
    }
  })

  return output
}

module.exports = {
  build,
  embellishLeaderboard,
  parseMedals
}
