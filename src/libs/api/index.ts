import JSONBig from 'json-bigint'

import { company } from '~fixtures/clans'
import { leaderboard, member as clanMember } from '~fixtures/members'
import { apiUrl } from '~helpers/urls'

import {
  type Clan,
  type ClanLeaderboardRow,
  type Event,
  type EventLeaderboardRow,
  type Member,
  type MemberLeaderboardRow,
  Status
} from './types'

const getData = async <T>(url: string): Promise<T> =>
  await fetch(apiUrl(url)).then(async response => {
    const json = JSONBig({ storeAsString: true }).parse(await response.text())
    // TODO: remove debug and handle errors
    // console.log(url, json)
    return json as T
  })

export const getClans = async (): Promise<Clan[]> => {
  // TODO: Get all clans from API
  const clans = [company]

  return clans
}

export const getClan = async (clanId: number): Promise<Clan> => {
  // TODO: Get clan details from API
  const clan = { ...company, id: clanId, leaderboard }

  return clan
}

export const getClanLeaderboard = async (
  eventId: number,
  clanId: number
): Promise<ClanLeaderboardRow[]> => {
  try {
    const { members } = await getData<any>(`${eventId}/Clan/${clanId}`)

    return members
  } catch {
    return []
  }
}

export const getEvents = async (): Promise<Event[]> => {
  try {
    const events = await getData<Event[]>('Tournaments')

    return events.sort((a, b) => b.startDate.localeCompare(a.startDate))
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

export const getMember = async (memberId: number): Promise<Member> => {
  // TODO: Get member details from API
  const member = {
    id: memberId,
    name: clanMember.name,
    avatar: clanMember.image
  }

  return member
}

export const getMemberLeaderboard = async (
  memberId: number
): Promise<MemberLeaderboardRow[]> => {
  const { matches } = await getData<any>(`CurrentEvent/ClanMember/${memberId}`)

  return matches
}
