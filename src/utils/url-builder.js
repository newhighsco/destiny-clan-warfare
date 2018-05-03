const constants = require('./constants')

const clanRootUrl = '/clans/'
const currentEventRootUrl = '/current/'
const eventRootUrl = '/events/'
const leaderboardRootUrl = '/leaderboard/'
const pgrcRootUrl = 'https://destinytracker.com/d2/pgcr/'
const profileRootUrl = '/members/'

const eventHash = (eventId) => {
  return eventId ? `${constants.prefix.hash}${eventId}` : ''
}

module.exports = {
  clanRootUrl,

  clanUrl: (clanId, eventId) => {
    return `${clanRootUrl}${clanId}/${eventHash(eventId)}`
  },

  currentEventRootUrl,

  currentEventUrl: (clanId, profileId) => {
    const clanUrl = clanId ? `${clanId}/` : ''
    const profileUrl = (clanId && profileId) ? `${profileId}/` : ''

    return `${currentEventRootUrl}${clanUrl}${profileUrl}`
  },

  eventRootUrl,

  eventUrl: (eventId) => {
    return `${eventRootUrl}${eventId}/`
  },

  leaderboardRootUrl,

  pgcrUrl: (pgcrId) => {
    return `${pgrcRootUrl}${pgcrId}`
  },

  profileRootUrl,

  profileUrl: (clanId, profileId, eventId) => {
    return `${clanRootUrl}${clanId}/${profileId}/${eventHash(eventId)}`
  }
}
