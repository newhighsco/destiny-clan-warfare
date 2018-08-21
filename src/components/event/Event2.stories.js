import React from 'react'
import { storiesOf } from '@storybook/react'
import Event from './Event'

const moment = require('moment')

const startDate = moment.utc().subtract(1, 'd').startOf('d')
const endDate = moment.utc().add(7, 'd').startOf('d')
const event = {
  path: '/',
  name: 'Competitive',
  description: 'Score points by completing matches in the Competitive playlist',
  modifiers: [
    { name: 'Merciless', bonus: 50, scoringModifier: true },
    { name: 'Abuse of power', bonus: -150, scoringModifier: true },
    { name: 'Perfection', bonus: 3 }
  ]
}
const row = {
  avatar: {
    color: '#5be7de',
    foreground: { color: '#f0f0f0', icon: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_c0ecd484a44c9aa934f9fb67e1ac1108.png' },
    background: { color: '#5be7de', icon: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_53468fe0799b424f995509d03be6bfa8.png' }
  },
  name: 'Avalanche UK',
  division: { name: 'Company' },
  path: '/#',
  platforms: [
    { id: 1, percentage: 100 }
  ],
  active: 50,
  size: 100,
  score: 10000,
  medal: { tier: 3 }
}
const leaderboard = Array(200).fill(row)
const leaderboards = [
  { leaderboard, division: { name: 'Company' } },
  { leaderboard, division: { name: 'Platoon' } },
  { leaderboard, division: { name: 'Squad' } }
]
const stats = { games: { stat: 495, label: [ 'Player [CLAN]' ] }, wins: { stat: 343, label: [ 'Player [CLAN]' ] } }
const results = Array(3).fill(row)
const medals = {
  clans: [
    { tier: 3, count: 1, label: [ 'Avalanche UK' ] },
    { tier: 2, count: 1, label: [ 'Avalanche UK' ] },
    { tier: 1, count: 1, label: [ 'Avalanche UK' ] }
  ]
}

storiesOf('Events', module)
  .add('Current', () => (
    <Event event={{ ...event, isCurrent: true, startDate: startDate, endDate: endDate }} stats={stats} />
  ))
  .add('Current - Leaderboards', () => (
    <Event event={{ ...event, isCurrent: true, startDate: startDate, endDate: endDate }} leaderboards={leaderboards} stats={{}} />
  ))
  .add('Current - Stats', () => (
    <Event event={{ ...event, isCurrent: true, startDate: startDate, endDate: endDate }} leaderboards={leaderboards} stats={stats} />
  ))
  .add('Current - Summary', () => (
    <Event event={{ ...event, isCurrent: true, startDate: startDate, endDate: endDate }} leaderboards={leaderboards} stats={stats} summary />
  ))
  .add('Future', () => (
    <Event event={{ ...event, isFuture: true, startDate: endDate }} />
  ))
  .add('Previous', () => (
    <Event event={{ ...event, isPast: true, endDate: startDate, isCalculated: true, results, medals }} />
  ))
  .add('Previous - Leaderboards', () => (
    <Event event={{ ...event, isPast: true, endDate: startDate, isCalculated: true, results, medals }} leaderboards={leaderboards} />
  ))
  .add('Previous - Summary', () => (
    <Event event={{ ...event, isPast: true, endDate: startDate, isCalculated: true, results, medals }} leaderboards={leaderboards} summary />
  ))
