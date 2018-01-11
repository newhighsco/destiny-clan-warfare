const constants = require('./constants')

const clanRootUrl = '/clans/'
const currentEventRootUrl = '/current/'
const eventRootUrl = '/events/'
const pgrcRootUrl = 'https://destinytracker.com/d2/pgcr/'
const profileRootUrl = '/members/'

const eventHash = (eventId) => {
  return eventId ? `${constants.prefix.hash}${eventId}/` : ''
}

module.exports = {
  clanRootUrl,

  clanUrl: (clanId, eventId) => {
    return `${clanRootUrl}${clanId}/${eventHash(eventId)}`
  },

  currentEventRootUrl,
  eventRootUrl,

  eventUrl: (eventId, clanId, profileId) => {
    const isExistingUrl = `${eventId}`.startsWith(eventRootUrl)
    const rootUrl = isExistingUrl ? '' : eventRootUrl
    const eventUrl = `${eventId}${isExistingUrl ? '' : '/'}`
    const clanUrl = clanId ? `${clanId}/` : ''
    const profileUrl = (clanId && profileId) ? `${profileId}/` : ''

    return `${rootUrl}${eventUrl}${clanUrl}${profileUrl}`
  },

  pgcrUrl: (pgcrId) => {
    return `${pgrcRootUrl}${pgcrId}`
  },

  profileRootUrl,

  profileUrl: (profileId, eventId) => {
    return `${profileRootUrl}${profileId}/${eventHash(eventId)}`
  }
}
