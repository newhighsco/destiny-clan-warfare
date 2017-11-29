var numberToWords = require('number-to-words')
var sentenceCase = require('sentence-case')

const build = (rank, tier, division) => {
  const place = numberToWords.toWords(rank)

  return {
    tier: tier,
    name: `${sentenceCase(place)} ${division}`,
    description: `Finished ${place} place in the ${division} division`
  }
}

const embellishLeaderboard = (leaderboard, division) => {
  return leaderboard.map(item => {
    let medal = {}

    switch (item.rank) {
      case '#1':
        medal = build(1, 2, division)
        break
      case '#2':
        medal = build(2, 1, division)
        break
      case '#3':
        medal = build(3, 1, division)
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
