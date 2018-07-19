import React from 'react'
import { storiesOf } from '@storybook/react'
import Leaderboard from './Leaderboard'

const row = {
  avatar: {
    color: '#5be7de',
    foreground: { color: '#f0f0f0', icon: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_c0ecd484a44c9aa934f9fb67e1ac1108.png' },
    background: { color: '#5be7de', icon: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_53468fe0799b424f995509d03be6bfa8.png' }
  },
  name: 'Avalanche UK',
  path: '/#',
  platforms: [
    { id: 1, percentage: 100 }
  ],
  medal: { tier: 3 }
}
const data = Array(5).fill(row)

storiesOf('Leaderboard', module)
  .add('Default', () => (
    <Leaderboard data={data} />
  ))
