const clanRootUrl = '/clans/'
const eventRootUrl = '/events/'
const pgrcRootUrl = 'http://destinytracker.com/d2/pgcr/'
const profileRootUrl = '/members/'
const currentEventRootUrl = `${eventRootUrl}current/`

module.exports = {
  clanRootUrl,

  clanUrl: (clanId) => {
    return `${clanRootUrl}${clanId}/`
  },

  currentEventRootUrl,

  currentEventUrl: (clanId, profileId) => {
    const clanUrl = `${clanId}/`
    const profileUrl = profileId ? `${profileId}/` : ''

    return `${currentEventRootUrl}${clanUrl}${profileUrl}`
  },

  eventRootUrl,

  eventUrl: (eventId) => {
    return `${eventRootUrl}${eventId}/`
  },

  pgcrUrl: (pgcrId) => {
    return `${pgrcRootUrl}${pgcrId}`
  },

  profileRootUrl,

  profileUrl: (profileId) => {
    return `${profileRootUrl}${profileId}/`
  }
}
