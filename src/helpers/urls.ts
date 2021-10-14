import urlJoin from 'url-join'
import config from '@config'

const { url: siteUrl } = config

const join = (...paths: Array<string>): string => urlJoin(paths.filter(Boolean))

export const canonicalUrl = (path?: string): string => join(siteUrl, path)

export const clanUrl = (clanId?: string, membershipId?: string): string =>
  join('/clans', clanId, membershipId)

export const eventUrl = (id?: string): string => join('/events', id)

export const userUrl = (path?: string): string => join('/user', path)

export const signInUrl = userUrl('signin')

export const signOutUrl = userUrl('signout')
