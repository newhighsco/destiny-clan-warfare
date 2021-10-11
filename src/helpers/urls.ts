import urlJoin from 'url-join'
import config from '@config'

const { url: siteUrl } = config

const join = (...paths: Array<string>): string => urlJoin(paths.filter(Boolean))

export const canonicalUrl = (url?: string): string => join(siteUrl, url)

export const clanUrl = (id?: string): string => join('clans', id)

export const eventUrl = (id?: string): string => join('events', id)
