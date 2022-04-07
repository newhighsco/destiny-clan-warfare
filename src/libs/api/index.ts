import { company } from '@fixtures/clans'
import { currentEvent, futureEvents, pastEvents } from '@fixtures/events'
import { apiUrl } from '@helpers/urls'
import { Clan, ClanLeaderboardRow, Event, EventLeaderboardRow } from './types'

const getData = async (url: string): Promise<any> =>
  await fetch(apiUrl(url)).then(async response => {
    const json = await response.json()
    // TODO: remove debug and handle errors
    // console.log(url, json)
    return json
  })

export const getClans = async (): Promise<Clan[]> => {
  // TODO: Get all clans from API
  const clans = [company]

  return clans
}

export const getClan = async (id: number): Promise<Clan> => {
  // TODO: Get clan details from API
  const clan = (await getClans()).find(clan => clan.id === id)

  return clan
}

export const getClanLeaderboard = async (
  id: number
): Promise<ClanLeaderboardRow[]> => {
  const { members } = await getData(`/CurrentEvent/Clan/${id}`)

  return members
}

export const getCurrentEvent = async (): Promise<{
  eventId: number
  leaderboard: EventLeaderboardRow[]
}> => {
  const { eventId, result: leaderboard } = await getData(
    'CurrentEvent/ClanLeaderboard'
  )

  return { eventId, leaderboard }
}

export const getEvents = async (): Promise<Event[]> => {
  // TODO: Get all events from API
  const events = [...futureEvents, currentEvent, ...pastEvents]

  return events
}

export const getEvent = async (id: number): Promise<Event> => {
  // TODO: Get event details from API
  const event = (await getEvents()).find(event => event.id === id)

  return event
}
