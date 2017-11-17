const clanRootUrl = '/clans/'
const currentEventRootUrl = '/current/'
const eventRootUrl = '/events/'
const pgrcRootUrl = 'http://destinytracker.com/d2/pgcr/'
const profileRootUrl = '/members/'

module.exports = {
  clanRootUrl,

  clanUrl: (clanId) => {
    return `${clanRootUrl}${clanId}/`
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

  profileUrl: (profileId) => {
    return `${profileRootUrl}${profileId}/`
  }
}
