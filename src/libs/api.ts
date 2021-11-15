import dayjs from 'dayjs'

const now = dayjs().startOf('d')
const modifiers = [
  {
    name: 'Pulsating',
    description: 'Get bonus points for pulse rifle kills',
    scoringModifier: true,
    scoringBonus: 100
  },
  {
    name: 'Show Some Mercy!',
    description: 'Win a game by mercy ruling and get a bonus 3000 points!',
    scoringModifier: true,
    scoringBonus: 3000
  },
  {
    name: 'Band Together',
    description:
      'Get an increased multiplier for playing with members of your clan (stacks)',
    multiplierBonus: 0.5
  }
]
const pastStats = [
  { name: 'Total clans', value: 1710 },
  { name: 'Total active', value: 34639 },
  { name: 'Total games', value: 996509 }
]
const currentStats = [
  { name: 'Most games', value: 495, label: 'Player [CLAN]' },
  { name: 'Most wins', value: 343, label: 'Player [CLAN]' }
]

export const getEvents = async () => {
  // TODO: Get all events from API
  const events = [
    {
      eventId: '4',
      startDate: now.add(8, 'd').format(),
      endDate: now.add(15, 'd').format(),
      name: 'Strikes',
      description:
        'Celebrate the return of heroic strikes by scoring points in any strike playlist',
      tense: 'Future',
      modifiers
    },
    {
      eventId: '3',
      startDate: now.format(),
      endDate: now.add(7, 'd').format(),
      name: 'Competitive',
      description:
        'Score points by completing matches in the Competitive playlist',
      tense: 'Current',
      modifiers
    },
    {
      eventId: '2',
      startDate: now.subtract(8, 'd').format(),
      endDate: now.subtract(1, 'd').format(),
      name: 'Iron Banner',
      description:
        'Iron Banner returns for season 2! Play Iron Banner, earn points.',
      tense: 'Past',
      modifiers
    },
    {
      eventId: '1',
      startDate: now.subtract(408, 'd').format(),
      endDate: now.subtract(401, 'd').format(),
      name: 'Quickplay',
      description:
        'Score points by completing matches in the Quickplay playlist',
      tense: 'Past',
      modifiers
    }
  ]

  return events
}

export const getEvent = async eventId => {
  // TODO: Get event details from API
  const event = (await getEvents()).find(
    event => event.eventId === eventId
  ) as any

  // TODO: Get stats
  event.stats =
    event.tense === 'Current'
      ? currentStats
      : event.tense === 'Past'
      ? pastStats
      : null
  event.statsGamesThreshold = 25
  // TODO: Get medals
  event.medals = []
  // TODO: Get leaderboard
  event.leaderboard = []

  return event
}
