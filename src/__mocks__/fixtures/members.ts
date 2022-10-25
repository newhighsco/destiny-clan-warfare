export const member = {
  name: 'benedfit',
  image: 'https://www.bungie.net/img/profile/avatars/cc13.jpg',
  email: 'email@example.com',
  membershipId: '4611686018441246884'
}

export const leaderboard = [...new Array(100)].map((_, index) => {
  const { membershipId: id, name, image: avatar } = member

  return {
    id,
    name,
    avatar,
    rank: index + 1,
    game: 10,
    wins: 10,
    kills: 100,
    assists: 100,
    deaths: 100,
    score: 1000
  }
})
