const apiBaseUrl = 'https://mb-dcw-test.azurewebsites.net/'
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
    loss: 'loss',
    winnersMedal: 'The Best of the Best'
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
    apiUrl: `${apiBaseUrl}api/`,
    proxyUrl: 'https://clanwarfare-proxy.herokuapp.com/'
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
    percent: '%',
    most: 'most',
    highest: 'highest'
  },
  enrollment: {
    existing: 'Clan already exists',
    closed: 'Not accepting new clans at this time.'
  },
  social: {
    discord: 'http://discord.destinyclanwarfare.com',
    patreon: 'https://www.patreon.com/destinyclanwarfare',
    paypal: 'https://www.paypal.me/destinyclanwarfare',
    twitter: 'https://twitter.com/destinyclanwar'
  }
}

module.exports = constants
