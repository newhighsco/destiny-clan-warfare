const bungieBaseUrl = 'https://www.bungie.net/'

const constants = {
  meta: {
    name: 'Destiny Clan Warfare',
    shortName: 'Clan Warfare',
    title: 'Destiny Clan Warfare - Band together, Guardians',
    description: 'Wage war against other clans in Destiny 2 and battle your way to the top of the Destiny 2 clan leaderboard',
    handle: '@destinyclanwar',
    themeColor: '#404040',
    trackingId: 'UA-109161360-1'
  },
  blank: '-',
  format: {
    date: 'YYYY-MM-DD',
    humanReadable: 'MMM DD HH:mm\xa0z',
    humanReadableDate: 'MMM DD',
    humanReadableTime: 'HH:mm z',
    machineReadable: 'YYYY-MM-DDTHH:mm:ssZ',
    url: 'YYYY-MM-DD'
  },
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
    currentStart: 'Start',
    currentEnd: 'End',
    past: 'Ended',
    future: 'Starts'
  },
  kicker: {
    current: 'Current event',
    past: 'Past event',
    future: 'Upcoming event',
    previous: 'Previous event',
    next: 'Next event',
    last: 'Last event'
  },
  server: {
    apiUrl: {
      protocol: 'https://',
      subdomains: [ 'mb-dcw-test2' ],
      domain: '.azurewebsites.net/',
      path: 'api/'
    },
    proxyUrl: 'https://clanwarfare-proxy.herokuapp.com/'
  },
  bungie: {
    baseUrl: bungieBaseUrl,
    apiUrl: `${bungieBaseUrl}Platform/`,
    disabledStatusCode: 5,
    iconUrl: `${bungieBaseUrl}img/profile/avatars/default_avatar.gif`,
    platformDefault: -1
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
    highest: 'highest',
    relative: 'in',
    enroll: 'enroll'
  },
  enrollment: {
    existing: 'Clan already exists',
    closed: 'Not accepting new clans at this time.'
  },
  social: {
    discord: 'https://discord.destinyclanwarfare.com',
    patreon: 'https://www.patreon.com/destinyclanwarfare',
    paypal: 'https://www.paypal.me/destinyclanwarfare',
    twitter: 'https://twitter.com/destinyclanwar'
  },
  matchHistoryLimit: 25
}

module.exports = constants
