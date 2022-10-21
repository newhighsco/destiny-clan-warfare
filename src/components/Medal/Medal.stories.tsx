import React from 'react'
import { Medal, MedalList } from '@components/Medal'

export default { component: Medal }

export const Source = { parameters: { chromatic: { disable: true } } }

export const List = {
  render: args => <MedalList {...args} />,
  args: {
    medals: [
      { name: 'Top 3 company', tier: 1, count: 1 },
      { name: 'Top 3 company', tier: 1, count: 5 },
      { name: 'First company', tier: 2, count: 1 },
      { name: 'First company', tier: 2, count: 5 },
      { tier: 2, count: 5 },
      { tier: 2, count: 1 },
      { name: 'The best of the best', tier: 3, count: 1 },
      { name: 'The best of the best', tier: 3, count: 5 },
      { tier: 3, count: 5 },
      { tier: 3, count: 1 },
      { name: 'Nonexistent', count: 5 },
      { name: 'Nonexistent', count: 1 }
    ]
  }
}
