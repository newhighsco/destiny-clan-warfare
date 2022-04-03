import urlJoin from 'url-join'
import config from '@config'

export const CURRENT_TENSE = 'Current'

const { url: siteUrl } = config

const join = (...paths: string[]): string => urlJoin(paths.filter(Boolean))

export const apiUrl = (path?: string): string =>
  join('https://newhighscoredcw.blob.core.windows.net/dcw', `${path}.json`)

export const canonicalUrl = (path?: string): string => join(siteUrl, path)

export const clanUrl = (clanId?: string, membershipId?: string): string =>
  join('/clans', clanId, membershipId)

export const currentUrl = (clanId?: string, membershipId?: string): string =>
  join('/current', clanId, membershipId)

export const eventUrl = (tense?: string, id?: string | number): string => {
  if (tense === CURRENT_TENSE) return currentUrl()

  return join('/events', id && `${id}`)
}

export const userUrl = (path?: string): string => join('/user', path)

export const signInUrl = userUrl('signin')

export const signOutUrl = userUrl('signout')
