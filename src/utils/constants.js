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
  divisions: [
    { key: 'Large', name: 'Company', size: '61+ members' },
    { key: 'Medium', name: 'Platoon', size: '31-60 members' },
    { key: 'Small', name: 'Squad', size: '1-30 members' }
  ],
  result: {
    win: 'win',
    loss: 'loss',
    winnersMedal: 'The Best of the Best'
  },
  tense: {
    current: 'Current',
    past: 'Past',
    future: 'Future',
    previous: 'Previous'
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
    next: 'Next event'
  },
  server: {
    apiUrl: {
      protocol: 'https://',
      subdomains: [ 'destinyclanwarfareapi' ],
      domain: '.azurewebsites.net/',
      path: 'api/'
    },
    proxyUrl: 'https://proxy.destinyclanwarfare.com/'
  },
  bungie: {
    baseUrl: bungieBaseUrl,
    apiUrl: `${bungieBaseUrl}Platform/`,
    disabledStatusCode: [ 5, 1618 ],
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
    closed: 'Not accepting new clans at this time.',
    optOut: 'This clan has opted out of DestinyClanWarfare'
  },
  social: {
    discord: 'https://discordapp.com/invite/Fysyhwg',
    patreon: 'https://www.patreon.com/destinyclanwarfare',
    paypal: 'https://www.paypal.me/destinyclanwarfare',
    twitter: 'https://twitter.com/destinyclanwar'
  },
  statsGamesThreshold: 15,
  matchHistoryLimit: 25
}

module.exports = constants
