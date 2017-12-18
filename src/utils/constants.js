const apiBaseUrl = 'https://destinyclanwarfare.azurewebsites.net/'
const bungieBaseUrl = 'https://www.bungie.net/'

const constants = {
  name: 'Destiny Clan Warfare',
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
    future: 'Upcoming event'
  },
  server: {
    baseUrl: apiBaseUrl,
    apiUrl: `${apiBaseUrl}api/`
  },
  bungie: {
    baseUrl: bungieBaseUrl,
    apiUrl: `${bungieBaseUrl}Platform/`,
    disabledStatusCode: 5
  }
}

module.exports = constants
