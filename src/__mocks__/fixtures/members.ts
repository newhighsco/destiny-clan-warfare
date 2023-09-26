import dayjs from 'dayjs'

const LEADERBOARD_LENGTH = 100
const now = dayjs()
const lastUpdated = now.subtract(1, 'M').startOf('d').toISOString()

export const member = {
  name: 'benedfit',
  image: 'https://www.bungie.net/img/profile/avatars/cc13.jpg',
  email: 'email@example.com',
  membershipId: '4611686018441246884'
}

export const leaderboard = [...new Array(LEADERBOARD_LENGTH)].map(
  (_, index) => {
    const { membershipId: id, name, image: avatar } = member
    const rank = index + 1
    const multiplier = LEADERBOARD_LENGTH - index

    return {
      id,
      name,
      avatar,
      lastUpdated,
      rank,
      game: 100 * multiplier,
      wins: 10 * multiplier,
      kills: 1100 * multiplier,
      assists: 500 * multiplier,
      deaths: 10 * multiplier,
      score: 110000 * multiplier
    }
  }
)
