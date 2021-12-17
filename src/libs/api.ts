import { currentEvent, futureEvents, pastEvents } from '@fixtures/events'

export const getEvents = async () => {
  // TODO: Get all events from API
  const events = [...futureEvents, currentEvent, ...pastEvents]

  return events
}

export const getEvent = async (id: number) => {
  // TODO: Get event details from API
  const event = (await getEvents()).find(event => event.id === id)

  return event
}
