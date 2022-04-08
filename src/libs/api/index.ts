import JSONBig from 'json-bigint'
import { company } from '@fixtures/clans'
import { apiUrl } from '@helpers/urls'
import {
  Clan,
  ClanLeaderboardRow,
  Event,
  EventLeaderboardRow,
  MemberLeaderboardRow,
  Status
} from './types'

const getData = async (url: string): Promise<any> =>
  await fetch(apiUrl(url)).then(async response => {
    const json = JSONBig({ storeAsString: true }).parse(await response.text())
    // TODO: remove debug and handle errors
    // console.log(url, json)
    return json
  })

export const getClans = async (): Promise<Clan[]> => {
  // TODO: Get all clans from API
  const clans = [company]

  return clans
}

export const getClan = async (clanId: number): Promise<Clan> => {
  // TODO: Get clan details from API
  const clan = { ...company, id: clanId }

  return clan
}

export const getClanLeaderboard = async (
  eventId: number,
  clanId: number
): Promise<ClanLeaderboardRow[]> => {
  try {
    const { members } = await getData(`${eventId}/Clan/${clanId}`)

    return members
  } catch {
    return []
  }
}

export const getEvents = async (): Promise<Event[]> => {
  try {
    return await getData('Tournaments')
  } catch {
    return []
  }
}

export const getEvent = async (eventId: string): Promise<Event> => {
  try {
    return await getData(`${eventId}/Tournament`)
  } catch {
    return null
  }
}

export const getEventLeaderboard = async (
  eventId: number,
  status: string
): Promise<EventLeaderboardRow[]> => {
  if (status === Status[Status.NotStarted]) return []

  try {
    return await getData(`${eventId}/ClanLeaderboard`)
  } catch {
    return []
  }
}

export const getMemberLeaderboard = async (
  memberId: number
): Promise<MemberLeaderboardRow[]> => {
  const { matches } = await getData(`CurrentEvent/ClanMember/${memberId}`)

  return matches
}
