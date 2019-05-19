const constants = require('./constants')
const absoluteUrl = require('./absolute-url')

const rootUrl = '/'
const clanRootUrl = `${rootUrl}clans/`
const currentEventRootUrl = `${rootUrl}current/`
const eventRootUrl = `${rootUrl}events/`
const leaderboardRootUrl = `${rootUrl}leaderboard/`
const pgrcRootUrl = 'https://destinytracker.com/d2/pgcr/'
const profileRootUrl = `${rootUrl}members/`

const eventHash = eventId => {
  return eventId ? `${constants.prefix.hash}${eventId}` : ''
}

module.exports = {
  rootUrl,

  clanRootUrl,

  clanUrl: (clanId, eventId) => {
    return `${clanRootUrl}${clanId}/${eventHash(eventId)}`
  },

  avatarIconUrl: icon => {
    if (absoluteUrl(icon)) return icon
    return `${constants.bungie.proxyUrl}${constants.bungie.avatarPath}${icon ||
      constants.bungie.defaultAvatarIcon}`
  },

  avatarLayerUrl: icon => {
    if (absoluteUrl(icon)) return icon
    return `${
      constants.bungie.proxyUrl
    }common/destiny2_content/icons/cb_decal_square_${icon}.png`
  },

  currentEventRootUrl,

  currentEventUrl: (clanId, profileId) => {
    const clanUrl = clanId ? `${clanId}/` : ''
    const profileUrl = clanId && profileId ? `${profileId}/` : ''

    return `${currentEventRootUrl}${clanUrl}${profileUrl}`
  },

  eventRootUrl,

  eventUrl: eventId => {
    return `${eventRootUrl}${eventId}/`
  },

  leaderboardRootUrl,

  pgcrUrl: pgcrId => {
    return `${pgrcRootUrl}${pgcrId}`
  },

  profileRootUrl,

  profileUrl: (clanId, profileId, eventId) => {
    return `${clanRootUrl}${clanId}/${profileId}/${eventHash(eventId)}`
  }
}
