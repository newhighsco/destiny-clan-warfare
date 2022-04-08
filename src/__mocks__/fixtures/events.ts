import dayjs from 'dayjs'
import { eventModifiers } from './modifiers'
import { Event } from '@libs/api/types'

const now = dayjs().startOf('d')

export const currentEvent = {
  id: 1,
  startDate: now.format(),
  endDate: now.add(7, 'd').format(),
  name: 'Competitive',
  description: 'Score points by completing matches in the Competitive playlist',
  status: 'Running',
  modifiers: eventModifiers,
  stats: [
    { name: 'Most games', value: 495, label: 'Player [CLAN]' },
    { name: 'Most wins', value: 343, label: 'Player [CLAN]' }
  ],
  statsGamesThreshold: 25
} as Event

export const pastEvents = [
  {
    id: 2,
    startDate: now.subtract(408, 'd').format(),
    endDate: now.subtract(401, 'd').format(),
    name: 'Quickplay',
    description: 'Score points by completing matches in the Quickplay playlist',
    status: 'Ended',
    modifiers: eventModifiers,
    stats: [
      { name: 'Total clans', value: 1710 },
      { name: 'Total active', value: 34639 },
      { name: 'Total games', value: 996509 }
    ],
    medals: [
      {
        tier: 2,
        awardedTo: ['Valhalla&#8482;'],
        description: 'Finished first place in a Company division event',
        name: 'First Company'
      },
      {
        tier: 2,
        awardedTo: ['MaIice&#8482;'],
        description: 'Finished first place in a Platoon division event',
        name: 'First Platoon'
      },
      {
        tier: 2,
        awardedTo: ['Care'],
        description: 'Finished first place in a Squad division event',
        name: 'First Squad'
      },
      {
        tier: 3,
        awardedTo: ['MaIice&#8482;'],
        description: 'Finished with the highest score overall for an event',
        name: 'The Best of the Best'
      },
      {
        tier: 1,
        awardedTo: [
          'Six Beers Deep',
          'Aces and Kings'
          // 'Ghosts Raiders',
          // '0 M E G A',
          // 'II This Is The Way II',
          // 'Most Rewarding Clan Ever'
        ],
        description: 'Had over 50% clan member participation in an event',
        name: 'The more you give, the more you get'
      }
    ]
  },
  {
    id: 3,
    startDate: now.subtract(8, 'd').format(),
    endDate: now.subtract(1, 'd').format(),
    name: 'Iron Banner',
    description:
      'Iron Banner returns for season 2! Play Iron Banner, earn points.',
    status: 'Ended',
    modifiers: eventModifiers,
    stats: [
      { name: 'Total clans', value: 1710 },
      { name: 'Total active', value: 34639 },
      { name: 'Total games', value: 996509 }
    ]
  }
] as Event[]

export const futureEvents = [
  {
    id: 4,
    startDate: now.add(8, 'd').format(),
    endDate: now.add(15, 'd').format(),
    name: 'Strikes',
    description:
      'Celebrate the return of heroic strikes by scoring points in any strike playlist',
    status: 'NotStarted',
    modifiers: eventModifiers
  }
] as Event[]
