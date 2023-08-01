import { type Clan } from '~libs/api/types'

export const company = {
  id: 1486166,
  name: 'Avalanche UK',
  tag: 'AVA',
  motto: 'Hardcore Casuals / Laidback Diehards',
  description:
    "Avalanche UK is a team of parents and adult gamers who've found mutual friendship through Destiny on Xbox One, our goal is to play the games we love with people who share our ethics. While fun is our main goal we also try to help new members rank up and progress as much as we can. So if you're an adult with or without commitments we could be the clan for you.\n\nWebsite: https://avaclanche.uk\nDiscord: https://discord.avaclanche.uk",
  avatar: {
    fill: '#5be7de',
    background: {
      fill: '#5be7de',
      src: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_4a2c1176d1e014ff2845c756603b04d3.png'
    },
    foreground: {
      fill: '#f0f0f0',
      src: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_f70a6bf33d1b03001325e27a60d74ee4.png'
    }
  }
} as Clan

export const leaderboard = [...new Array(100)].map((_, index) => {
  const { id, name, avatar } = company
  const rank = index + 1

  return {
    id,
    name,
    avatar,
    rank,
    active: 50 * rank,
    size: 100 * rank,
    score: 110000 * rank
  }
})
