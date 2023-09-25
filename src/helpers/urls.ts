import urlJoin from 'url-join'

import { Status } from '~libs/api/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const join = (...paths: any[]): string =>
  urlJoin(paths.filter(Boolean).map(path => `${path as string}`))

export const apiUrl = (path?: string): string =>
  join(process.env.NEXT_PUBLIC_API_URL, `${path}.json`)

export const canonicalUrl = (path?: string): string => join(siteUrl, path)

export const clanUrl = (
  clanId?: number | string,
  membershipId?: number | string
): string => join('/clans', clanId, membershipId)

export const currentUrl = (
  clanId?: number | string,
  membershipId?: number | string
): string => join('/current', clanId, membershipId)

export const eventUrl = (status?: string, id?: number | string): string => {
  if (status === Status[Status.Running]) return currentUrl()

  return join('/events', id)
}

export const pgcrUrl = (id: number | string): string =>
  join('https://destinytracker.com/destiny-2/pgcr', id)

export const userUrl = (path?: string): string => join('/user', path)

export const signInUrl = userUrl('signin')

export const signOutUrl = userUrl('signout')
