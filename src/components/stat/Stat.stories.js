import React from 'react'
import { storiesOf } from '@storybook/react'
import { StatList } from './Stat'

const stats = {
  games: 1000,
  wins: 200,
  kd: 10.5,
  kda: 25.346,
  ppg: 100000,
  score: 2000000,
  bonuses: [
    { shortName: 'Bonus 1', count: 99 },
    { shortName: 'Bonus 2', count: 0 }
  ]
}

const empty = {
  games: -1,
  wins: -1,
  kd: -1,
  kda: -1,
  ppg: -1,
  score: -1,
  bonuses: [
    { shortName: 'Bonus 1', count: -1 },
    { shortName: 'Bonus 2', count: -1 }
  ]
}

storiesOf('Stat', module)
  .add('List', () => <StatList stats={stats} />)
  .add('List (empty)', () => <StatList stats={empty} />)
