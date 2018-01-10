const apiBaseUrl = 'https://destinyclanwarfare.azurewebsites.net/'
const bungieBaseUrl = 'https://www.bungie.net/'

const constants = {
  meta: {
    name: 'Destiny Clan Warfare',
    shortName: 'D2 Clan Wars',
    title: 'Destiny Clan Warfare - Band together, Guardians',
    description: 'Wage war against other clans in Destiny 2 and battle your way to the top of the Destiny 2 clan leaderboard',
    handle: '@destinyclanwar',
    themeColor: '#404040'
  },
  blank: '-',
  dateFormat: 'YYYY-MM-DD',
  division: {
    large: 'Company',
    medium: 'Platoon',
    small: 'Squad'
  },
  result: {
    win: 'win',
    loss: 'loss'
  },
  tense: {
    current: 'Current',
    past: 'Past',
    future: 'Future'
  },
  relativeDate: {
    updated: 'Updated',
    current: 'Ends',
    past: 'Ended',
    future: 'Starts'
  },
  kicker: {
    current: 'Current event',
    past: 'Past event',
    future: 'Upcoming event',
    previous: 'Previous event',
    next: 'Next event'
  },
  server: {
    baseUrl: apiBaseUrl,
    apiUrl: `${apiBaseUrl}api/`
  },
  bungie: {
    baseUrl: bungieBaseUrl,
    apiUrl: `${bungieBaseUrl}Platform/`,
    disabledStatusCode: 5
  },
  prefix: {
    clan: 'Clan',
    profile: 'Member',
    medal: 'Medal',
    modifier: 'Modifier',
    event: 'Event',
    hash: '#',
    positive: '+',
    multiply: 'x',
    percent: '%'
  }
}

module.exports = constants
