import dayjs from 'dayjs'

export const getEvents = async () => {
  // TODO: Get all events from API
  const now = dayjs().startOf('d')
  const events = [
    {
      eventId: '4',
      startDate: now.add(8, 'd').format(),
      endDate: now.add(15, 'd').format(),
      name: 'Strikes',
      description:
        'Celebrate the return of heroic strikes by scoring points in any strike playlist',
      tense: 'Future'
    },
    {
      eventId: '3',
      startDate: now.format(),
      endDate: now.add(7, 'd').format(),
      name: 'Competitive',
      description:
        'Score points by completing matches in the Competitive playlist',
      tense: 'Current'
    },
    {
      eventId: '2',
      startDate: now.subtract(8, 'd').format(),
      endDate: now.subtract(1, 'd').format(),
      name: 'Iron Banner',
      description:
        'Iron Banner returns for season 2! Play Iron Banner, earn points.',
      tense: 'Past'
    },
    {
      eventId: '1',
      startDate: now.subtract(408, 'd').format(),
      endDate: now.subtract(401, 'd').format(),
      name: 'Quickplay',
      description:
        'Score points by completing matches in the Quickplay playlist',
      tense: 'Past'
    }
  ]

  return events
}

export const getEvent = async eventId => {
  // TODO: Get event details from API
  const event = (await getEvents()).find(event => event.eventId === eventId)

  return event
}
