var numberToWords = require('number-to-words')
var sentenceCase = require('sentence-case')

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

module.exports = {
  build,
  embellishLeaderboard
}
