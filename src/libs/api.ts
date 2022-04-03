import { currentEvent, futureEvents, pastEvents } from '@fixtures/events'
import { apiUrl } from '@helpers/urls'

const getData = async url =>
  await fetch(apiUrl(url)).then(async res => await res.json())

export const getCurrentEvent = async () => {
  const {
    CurrentEvent: { Id: currentEventId },
    Result: leaderboard
  } = await getData('CurrentEvent/ClanLeaderboard')

  return {
    currentEventId,
    leaderboard
  }
}

export const getEvents = async () => {
  // TODO: Get all events from API
  const events = [...futureEvents, currentEvent, ...pastEvents]

  return events
}

export const getEvent = async (id: string) => {
  // TODO: Get event details from API
  const event = (await getEvents()).find(event => `${event.id}` === `${id}`)

  return event
}
