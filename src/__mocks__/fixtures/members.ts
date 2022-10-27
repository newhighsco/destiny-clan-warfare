export const member = {
  name: 'benedfit',
  image: 'https://www.bungie.net/img/profile/avatars/cc13.jpg',
  email: 'email@example.com',
  membershipId: '4611686018441246884'
}

export const leaderboard = [...new Array(100)].map((_, index) => {
  const { membershipId: id, name, image: avatar } = member
  const rank = index + 1

  return {
    id,
    name,
    avatar,
    rank,
    game: 100 * rank,
    wins: 10 * rank,
    kills: 1100 * rank,
    assists: 500 * rank,
    deaths: 10 * rank,
    score: 110000 * rank
  }
})
