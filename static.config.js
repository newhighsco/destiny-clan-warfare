import MultiSort from 'multi-sort'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import RSS from 'rss'
import Html from './src/html'

require('dotenv').config()

const path = require('path')
const fs = require('fs-extra')
const camelcaseKeys = require('camelcase-keys')
const moment = require('moment')
const linkify = require('linkify-urls')
const autoprefixer = require('autoprefixer')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const poststylus = require('poststylus')
const Visualizer = require('webpack-visualizer-plugin')
const constants = require('./src/utils/constants')
const medalBuilder = require('./src/utils/medal-builder')
const urlBuilder = require('./src/utils/url-builder')
const feedBuilder = require('./src/utils/feed-builder')
const api = require('./src/utils/api-helper').api
const bungie = require('./src/utils/bungie-helper')
const decode = require('./src/utils/html-entities').decode

const distPath = 'public'
const enableMatchHistory = JSON.parse(process.env.ENABLE_MATCH_HISTORY)
const enablePreviousLeaderboards = JSON.parse(process.env.ENABLE_PREVIOUS_LEADERBOARDS)
var currentEvent

export default {
  paths: {
    dist: distPath,
    devDist: distPath,
    public: 'static'
  },
  devServer: {
    port: 9000
  },
  siteRoot: process.env.SITE_URL,
  getSiteData: () => ({
    title: constants.meta.title
  }),
  getRoutes: async () => {
    var apiStatus = {
      enrollmentOpen: false,
      bungieStatus: constants.bungie.disabledStatusCode,
      updatedDate: moment.utc().format(constants.format.machineReadable)
    }
    var clans = []
    var currentMemberLeaderboards = []
    var previousMemberLeaderboards = []
    var members = []
    var histories = []
    var events = []
    var modifiers = []
    var medals = []
    var currentEventLeaderboard
    var previousEventId = Number.NEGATIVE_INFINITY
    const casingOptions = { deep: true }
    const linkifyOptions = { attributes: { target: '_blank' } }
    const clanPlatforms = []

    const parseModifier = (modifier) => {
      const member = members.find(member => member.profileIdStr === modifier.createdBy)
      const clan = member ? clans.find(clan => clan.groupId === member.groupId) : null

      const creator = {
        id: member ? member.profileIdStr : '',
        name: member ? decode(member.name) : '',
        clanTag: clan ? decode(clan.tag) : ''
      }

      return {
        ...modifier,
        shortName: modifier.shortName || modifier.name.split(' ')[0],
        creator: creator
      }
    }

    const sources = [
      new Promise((resolve, reject) => {
        console.time(`fetch enrollment open`)

        api(`Clan/AcceptingNewClans`)
          .then(({ data }) => {
            apiStatus.enrollmentOpen = data
            console.timeEnd(`fetch enrollment open`)
            console.log(`enrollment open: ${apiStatus.enrollmentOpen}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch enrollment open', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch bungie api status`)

        bungie(`/Destiny2/Manifest`)
          .then(({ data }) => {
            if (data.ErrorCode) apiStatus.bungieStatus = data.ErrorCode
            console.timeEnd(`fetch bungie api status`)
            console.log(`bungie api status: ${apiStatus.bungieStatus}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch bungie api status', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch clans`)

        api(`Clan/GetAllClans`)
          .then(({ data }) => {
            clans = data.map(item => camelcaseKeys(item, casingOptions))
            console.timeEnd(`fetch clans`)
            console.log(`clans: ${clans.length}`)
            resolve()
          })
          .catch(err => console.error('fetch clans', err))
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch members`)

        api(`Clan/GetAllMembers`)
          .then(({ data }) => {
            members = data.map(item => camelcaseKeys(item, casingOptions))
            console.timeEnd(`fetch members`)
            console.log(`members: ${members.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch members', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch events`)

        api(`Event/GetAllEvents`)
          .then(({ data }) => {
            events = data.map(item => camelcaseKeys(item, casingOptions))
            console.timeEnd(`fetch events`)
            console.log(`events: ${events.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch events', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch modifiers`)

        api(`Component/GetAllModifiers`)
          .then(({ data }) => {
            modifiers = data.map(item => parseModifier(camelcaseKeys(item, casingOptions)))
            console.timeEnd(`fetch modifiers`)
            console.log(`modifiers: ${modifiers.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch modifiers', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch member medals`)

        api(`Component/GetAllMedals`)
          .then(({ data }) => {
            medals = medals.concat(medalBuilder.parseMedals(camelcaseKeys(data, casingOptions), constants.prefix.profile))
            console.timeEnd(`fetch member medals`)
            console.log(`member medals: ${data.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch member medals', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch clan medals`)

        api(`Component/GetAllClanMedals`)
          .then(({ data }) => {
            medals = medals.concat(medalBuilder.parseMedals(camelcaseKeys(data, casingOptions), constants.prefix.clan))
            console.timeEnd(`fetch clan medals`)
            console.log(`clan medals: ${data.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch clan medals', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch event leaderboard`)

        api(`Leaderboard/GetLeaderboard`)
          .then(({ data }) => {
            currentEventLeaderboard = camelcaseKeys(data, casingOptions)
            console.timeEnd(`fetch event leaderboard`)
            console.log(`event leaderboard: ${currentEventLeaderboard !== null}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch event leaderboard', err)
            reject(err)
          })
      }),
      new Promise((resolve, reject) => {
        console.time(`fetch current clan leaderboard`)

        api(`Leaderboard/GetClanLeaderboard`)
          .then(({ data }) => {
            currentMemberLeaderboards = camelcaseKeys(data, casingOptions)
            console.timeEnd(`fetch current clan leaderboard`)
            console.log(`current clan leaderboard: ${currentMemberLeaderboards.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch current clan leaderboard', err)
            reject(err)
          })
      })
    ]

    if (enablePreviousLeaderboards) {
      sources.push(new Promise((resolve, reject) => {
        console.time(`fetch previous clan leaderboard`)

        api(`Leaderboard/GetPreviousClanLeaderboard`)
          .then(({ data }) => {
            previousMemberLeaderboards = camelcaseKeys(data[0].LeaderboardList, casingOptions)
            previousEventId = data[0].EventId
            console.timeEnd(`fetch previous clan leaderboard`)
            console.log(`previous clan leaderboard: ${previousMemberLeaderboards.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch previous clan leaderboard', err)
            reject(err)
          })
      }))
    } else {
      console.log('fetch previous clan leaderboard disabled')
    }

    if (enableMatchHistory) {
      sources.push(new Promise((resolve, reject) => {
        console.time(`fetch match history`)

        api(`Leaderboard/GetAllPlayersHistory`)
          .then(({ data }) => {
            histories = data.Data.map(item => camelcaseKeys(item, casingOptions))
            console.timeEnd(`fetch match history`)
            console.log(`match history: ${histories.length}`)
            resolve()
          })
          .catch(err => {
            console.error('fetch match history', err)
            reject(err)
          })
      }))
    } else {
      console.log('fetch match history disabled')
    }

    await Promise.all(sources)

    await fs.writeFile(path.join(distPath, 'api-status.json'), JSON.stringify(apiStatus))

    const parseBonuses = (item) => {
      const bonuses = [ item.bonusPoints1, item.bonusPoints2, item.bonusPoints3 ]

      return bonuses.filter(bonus => bonus && bonus.bonusPoints !== null).map(bonus => {
        const modifier = modifiers.find(modifier => modifier.id === bonus.modifierId)
        if (modifier) {
          return {
            ...modifier,
            count: bonus.bonusPoints
          }
        }

        return null
      })
    }

    console.time(`create event nodes`)

    const parsedEvents = []

    await Promise.all(events.map(event => {
      var hasResults = false

      const parseClans = (rawClans, eventId, isCurrent) => {
        if (!rawClans) return []

        return rawClans.map((rawClan, i) => {
          const clanId = rawClan.clanId || rawClan.id
          const clan = clans.find(clan => clan.groupId === clanId)
          const platforms = clanPlatforms.find(({ id }) => id === clanId)

          if (!clan) {
            console.error(`Cannot find clan: ${clanId}`)
            return null
          }

          return {
            path: isCurrent ? urlBuilder.currentEventUrl(clan.groupId) : urlBuilder.clanUrl(clan.groupId, eventId),
            platforms: platforms ? platforms.platforms : [],
            name: decode(clan.name),
            color: clan.backgroundcolor,
            foreground: {
              color: clan.emblemcolor1,
              icon: clan.foregroundicon
            },
            background: {
              color: clan.emblemcolor2,
              icon: clan.backgroundicon
            },
            rank: `${constants.prefix.hash}${i + 1}`,
            size: rawClan.size || 0,
            active: rawClan.active || 0,
            games: rawClan.gamesPlayed,
            wins: rawClan.gamesWon,
            kills: rawClan.kills,
            assists: rawClan.assists,
            deaths: rawClan.deaths,
            score: parseInt(Math.round(rawClan.score || rawClan.totalScore || 0))
          }
        })
      }

      const parseResults = (division, leaderboard, results) => {
        if (leaderboard && leaderboard.length) {
          hasResults = true

          results.push({
            ...leaderboard[0],
            division: division,
            medal: medalBuilder.build(1, 2, division)
          })
        } else {
          results.push({
            path: '',
            platforms: [ { id: constants.bungie.platformDefault, size: Number.NEGATIVE_INFINITY, active: Number.NEGATIVE_INFINITY } ],
            name: '',
            color: '',
            foreground: { color: '', icon: '' },
            background: { color: '', icon: '' },
            rank: '',
            size: Number.NEGATIVE_INFINITY,
            games: Number.NEGATIVE_INFINITY,
            wins: Number.NEGATIVE_INFINITY,
            kills: Number.NEGATIVE_INFINITY,
            assists: Number.NEGATIVE_INFINITY,
            deaths: Number.NEGATIVE_INFINITY,
            score: Number.NEGATIVE_INFINITY,
            division: '',
            medal: {
              tier: Number.NEGATIVE_INFINITY,
              name: '',
              description: ''
            }
          })
        }
      }

      const startDate = moment.utc(event.startTime).format(constants.format.machineReadable)
      const endDate = moment.utc(event.scoringEndTime).format(constants.format.machineReadable)
      var isCurrent = event.eventTense === constants.tense.current
      var isPast = event.eventTense === constants.tense.past
      var isFuture = event.eventTense === constants.tense.future
      const results = []
      var largeLeaderboard = []
      var mediumLeaderboard = []
      var smallLeaderboard = []

      if (isCurrent && endDate < apiStatus.updatedDate) {
        isCurrent = false
        isPast = true
      }

      if (isFuture && startDate < apiStatus.updatedDate) {
        isCurrent = true
        isFuture = false
      }

      if (isCurrent) {
        currentEvent = event
        largeLeaderboard = parseClans(currentEventLeaderboard.largeLeaderboard, event.eventId, true)
        mediumLeaderboard = parseClans(currentEventLeaderboard.mediumLeaderboard, event.eventId, true)
        smallLeaderboard = parseClans(currentEventLeaderboard.smallLeaderboard, event.eventId, true)
      } else {
        largeLeaderboard = parseClans(event.result.large, event.eventId)
        mediumLeaderboard = parseClans(event.result.medium, event.eventId)
        smallLeaderboard = parseClans(event.result.small, event.eventId)

        parseResults(constants.division.large, largeLeaderboard, results)
        parseResults(constants.division.medium, mediumLeaderboard, results)
        parseResults(constants.division.small, smallLeaderboard, results)

        const winnersMedal = medals.find(({ name }) => name.toUpperCase() === constants.result.winnersMedal.toUpperCase())

        if (winnersMedal) {
          results
            .sort((a, b) => b.score - a.score)
            .map((item, i) => {
              if (i === 0) {
                item.medal = winnersMedal
              }
              return item
            })
        }
      }

      return parsedEvents.push({
        id: event.eventId,
        path: isCurrent ? urlBuilder.currentEventUrl() : urlBuilder.eventUrl(event.eventId),
        name: event.name,
        description: event.description || '',
        startDate: moment.utc(startDate).format(constants.format.machineReadable),
        endDate: moment.utc(endDate).format(constants.format.machineReadable),
        isPast: isPast,
        isFuture: isFuture,
        isCurrent: isCurrent,
        isCalculated: event.calculated,
        visible: event.expired ? hasResults : true,
        modifiers: event.modifiers ? event.modifiers.map(modifier => parseModifier(modifier)) : [],
        leaderboards: {
          large: largeLeaderboard,
          medium: mediumLeaderboard,
          small: smallLeaderboard
        },
        results: results.filter(({ score }) => score > 0),
        medals: {
          clans: event.clanMedals ? medalBuilder.parseMedals(event.clanMedals, constants.prefix.clan, 1) : [],
          members: event.clanMemberMedals ? medalBuilder.parseMedals(event.clanMemberMedals, constants.prefix.profile, 1) : []
        }
      })
    }))

    console.timeEnd(`create event nodes`)

    console.time(`create clan nodes`)

    const parsedClans = []

    const parseTags = (bonusUnlocks) => {
      return bonusUnlocks.map(bonus => {
        return {
          name: bonus.name || '',
          description: bonus.description || ''
        }
      })
    }

    await Promise.all(clans.map(clan => {
      const clanMembers = members.filter(member => member.groupId === clan.groupId)
      const currentClanLeaderboard = currentMemberLeaderboards.filter(item => item.clanId === clan.groupId)
      const previousClanLeaderboard = previousMemberLeaderboards.filter(item => item.clanId === clan.groupId)
      const platforms = clanMembers.reduce((platforms, member) => {
        const hasPlayed = member.currentScore ? member.currentScore.gamesPlayed > 0 : false
        const id = member.membershipType
        const existing = platforms.find(platform => platform.id === id)

        if (existing) {
          existing.size++
          if (hasPlayed) existing.active++
        } else {
          platforms.push({ id: id, size: 1, active: hasPlayed ? 1 : 0 })
        }

        return platforms
      }, [])

      clanPlatforms.push({ id: clan.groupId, platforms: platforms })

      const parseClanLeaderboard = (leaderboard, eventId, isCurrent) => {
        if (leaderboard.length === 0) {
          return [ {
            path: '',
            id: '',
            platforms: [ { id: constants.bungie.platformDefault, size: Number.NEGATIVE_INFINITY, active: Number.NEGATIVE_INFINITY } ],
            name: '',
            icon: '',
            tags: [ { name: '', description: '' } ],
            games: Number.NEGATIVE_INFINITY,
            wins: Number.NEGATIVE_INFINITY,
            kills: Number.NEGATIVE_INFINITY,
            assists: Number.NEGATIVE_INFINITY,
            deaths: Number.NEGATIVE_INFINITY,
            bonuses: [ { shortName: '', count: Number.NEGATIVE_INFINITY } ],
            score: Number.NEGATIVE_INFINITY,
            eventId: eventId
          } ]
        }

        return leaderboard.map(item => {
          const member = clanMembers.find(member => member.profileIdStr === item.idStr)

          if (!member) {
            if (isCurrent) console.error(`Cannot find member: ${item.idStr}`)
            return null
          }

          return {
            path: isCurrent ? urlBuilder.currentEventUrl(member.groupId, member.profileIdStr) : urlBuilder.profileUrl(member.profileIdStr, eventId),
            id: member.profileIdStr,
            platforms: [ { id: member.membershipType || constants.bungie.platformDefault, size: 1, active: 1 } ],
            name: decode(member.name),
            icon: member.icon,
            tags: parseTags(member.bonusUnlocks),
            games: item.gamesPlayed,
            wins: item.gamesWon,
            kills: item.kills,
            assists: item.assists,
            deaths: item.deaths,
            bonuses: parseBonuses(item),
            score: parseInt(Math.round(item.totalScore)),
            eventId: eventId,
            updatedDate: moment.utc(member.lastchecked || 0).format(constants.format.machineReadable)
          }
        })
      }

      return parsedClans.push({
        id: `${clan.groupId}`,
        platforms: platforms,
        path: urlBuilder.clanUrl(clan.groupId),
        name: decode(clan.name),
        nameSortable: clan.name.toUpperCase(),
        tag: decode(clan.tag),
        motto: decode(clan.motto),
        description: linkify(clan.description, linkifyOptions).split(/\r?\n/g).join('<br />'),
        color: clan.backgroundcolor,
        foreground: {
          color: clan.emblemcolor1,
          icon: clan.foregroundicon
        },
        background: {
          color: clan.emblemcolor2,
          icon: clan.backgroundicon
        },
        leaderboard: parseClanLeaderboard(currentClanLeaderboard, currentEvent.eventId, true),
        leaderboardVisible: currentClanLeaderboard.length > 0,
        previousLeaderboard: parseClanLeaderboard(previousClanLeaderboard, previousEventId),
        medals: medalBuilder.parseMedals(clan.medalUnlocks, constants.prefix.clan)
      })
    }))

    console.timeEnd(`create clan nodes`)

    console.time(`create member nodes`)

    const parsedMembers = []

    await Promise.all(members.map(member => {
      const clan = clans.find(clan => clan.groupId === member.groupId)
      const historyCount = constants.matchHistoryLimit
      var history = MultiSort(histories.filter(history => history.memberShipIdStr === member.profileIdStr), 'datePlayed', 'DESC').slice(0, historyCount)

      var memberLeaderboard = currentMemberLeaderboards.find(({ idStr }) => idStr === member.profileIdStr)

      var leaderboard = {
        games: Number.NEGATIVE_INFINITY,
        wins: Number.NEGATIVE_INFINITY,
        kills: Number.NEGATIVE_INFINITY,
        assists: Number.NEGATIVE_INFINITY,
        deaths: Number.NEGATIVE_INFINITY,
        bonuses: [],
        score: Number.NEGATIVE_INFINITY
      }

      if (memberLeaderboard) {
        leaderboard = {
          games: memberLeaderboard.gamesPlayed,
          wins: memberLeaderboard.gamesWon,
          kills: memberLeaderboard.kills,
          assists: memberLeaderboard.assists,
          deaths: memberLeaderboard.deaths,
          bonuses: parseBonuses(memberLeaderboard),
          score: parseInt(Math.round(memberLeaderboard.totalScore))
        }
      }

      var totals = {
        games: Number.NEGATIVE_INFINITY,
        wins: Number.NEGATIVE_INFINITY,
        kills: Number.NEGATIVE_INFINITY,
        assists: Number.NEGATIVE_INFINITY,
        deaths: Number.NEGATIVE_INFINITY,
        score: Number.NEGATIVE_INFINITY,
        lastPlayed: moment.utc(new Date(0)).format(constants.format.machineReadable)
      }

      if (member.currentScore && member.currentScore.lastSeen) {
        totals = {
          games: member.currentScore.gamesPlayed,
          wins: member.currentScore.gamesWon,
          kills: member.currentScore.kills,
          assists: member.currentScore.assists,
          deaths: member.currentScore.deaths,
          score: parseInt(Math.round(member.currentScore.totalScore)),
          lastPlayed: moment.utc(member.currentScore.lastSeen).format(constants.format.machineReadable)
        }
      }

      return parsedMembers.push({
        id: member.profileIdStr,
        platforms: [ { id: member.membershipType || constants.bungie.platformDefault, size: 1, active: 1 } ],
        path: urlBuilder.profileUrl(member.profileIdStr),
        clanId: `${constants.prefix.hash}${member.groupId}`,
        clanName: decode(clan.name),
        clanPath: urlBuilder.clanUrl(member.groupId),
        clanTag: decode(clan.tag),
        clanSortable: clan.name.toUpperCase(),
        name: decode(member.name),
        nameSortable: member.name.toUpperCase(),
        icon: member.icon,
        tags: parseTags(member.bonusUnlocks),
        medals: medalBuilder.parseMedals(member.medalUnlocks, constants.prefix.profile),
        totals: totals,
        totalsVisible: totals.games > 0,
        totalsSortable: totals.lastPlayed,
        leaderboard: leaderboard,
        leaderboardVisible: leaderboard.games > 0,
        history: history.map(item => {
          return {
            game: {
              path: urlBuilder.pgcrUrl(item.pgcrId),
              isExternal: true,
              result: item.gameWon === true ? constants.result.win : (item.gameWon === false ? constants.result.loss : ''),
              type: item.gameType,
              map: item.map,
              endDate: moment.utc(item.datePlayed).format(constants.format.machineReadable)
            },
            kills: item.kills,
            assists: item.assists,
            deaths: item.deaths,
            bonuses: parseBonuses(item),
            score: parseInt(Math.round(item.totalScore))
          }
        }),
        updatedDate: moment.utc(member.lastchecked || 0).format(constants.format.machineReadable)
      })
    }))

    console.timeEnd(`create member nodes`)

    const visibleEvents = MultiSort(parsedEvents.filter(({ visible }) => visible), 'startDate', 'DESC')
    const routes = [
      {
        path: '/',
        component: 'src/pages/index',
        getData: async () => ({
          canonical: '/',
          clans: MultiSort(parsedClans, 'nameSortable', 'ASC').map(clan => {
            return {
              path: clan.path,
              id: clan.id
            }
          }),
          currentEvents: MultiSort(parsedEvents.filter(({ isCurrent }) => isCurrent), 'startDate', 'ASC').slice(0, 1),
          pastEvents: MultiSort(parsedEvents.filter(({ isPast }) => isPast), 'startDate', 'DESC').slice(0, 1),
          futureEvents: MultiSort(parsedEvents.filter(({ isFuture }) => isFuture), 'startDate', 'ASC').slice(0, 1)
        })
      },
      {
        path: urlBuilder.clanRootUrl,
        component: 'src/pages/clans',
        getData: async () => ({
          canonical: urlBuilder.clanRootUrl,
          data: {
            allClan: MultiSort(parsedClans, 'nameSortable', 'ASC')
          }
        }),
        children: parsedClans.map(clan => ({
          path: `/${clan.id}/`,
          component: 'src/templates/clan',
          getData: async () => ({
            canonical: clan.path,
            data: {
              clan,
              allMember: MultiSort(parsedMembers.filter(({ clanId }) => clanId === `${constants.prefix.hash}${clan.id}`), {
                totalsSortable: 'ASC',
                nameSortable: 'ASC'
              })
            }
          })
        }))
      },
      {
        path: urlBuilder.profileRootUrl,
        component: 'src/pages/members',
        getData: async () => ({
          canonical: urlBuilder.profileRootUrl,
          data: {
            allMember: MultiSort(parsedMembers.filter(({ totalsVisible }) => totalsVisible), {
              clanSortable: 'ASC',
              nameSortable: 'ASC'
            })
          }
        })
      },
      {
        path: urlBuilder.eventRootUrl,
        component: 'src/pages/events',
        getData: async () => ({
          canonical: urlBuilder.eventRootUrl,
          data: {
            allEvent: visibleEvents
          }
        }),
        children: parsedEvents.filter(({ visible }) => visible).map(event => ({
          path: `/${event.id}/`,
          component: 'src/templates/event',
          getData: async () => ({
            canonical: event.path,
            data: {
              event
            }
          })
        }))
      },
      {
        path: '/faqs/',
        component: 'src/pages/faqs',
        getData: async () => ({
          canonical: '/faqs/'
        })
      },
      {
        path: '/support-us/',
        component: 'src/pages/support-us',
        getData: async () => ({
          canonical: '/support-us/'
        })
      },
      {
        path: '/thanks/',
        component: 'src/pages/thanks',
        getData: async () => ({
          canonical: '/thanks/'
        })
      },
      {
        is404: true,
        component: 'src/pages/404'
      }
    ]

    if (currentEvent) {
      routes.push({
        path: urlBuilder.currentEventRootUrl,
        component: 'src/templates/event',
        getData: async () => ({
          canonical: urlBuilder.currentEventRootUrl,
          data: {
            event: parsedEvents.find(({ id }) => id === currentEvent.eventId)
          }
        }),
        children: parsedClans.filter(({ leaderboardVisible }) => leaderboardVisible).map(clan => ({
          path: `/${clan.id}/`,
          component: 'src/templates/event-clan',
          getData: async () => ({
            canonical: urlBuilder.currentEventUrl(clan.id),
            data: {
              clan,
              allMember: parsedMembers.filter(({ clanId }) => clanId === `${constants.prefix.hash}${clan.id}`)
            }
          })
        }))
      })
    }

    const feedOptions = {
      title: constants.meta.title,
      description: constants.meta.description,
      site_url: process.env.SITE_URL
    }
    var feed = new RSS(feedOptions)

    feedBuilder(visibleEvents).map(event => feed.item(event))

    await fs.writeFile(path.join(distPath, '/events.xml'), feed.xml())

    feed = new RSS(feedOptions)

    feedBuilder(visibleEvents, constants.kicker.current).map(event => feed.item(event))

    await fs.writeFile(path.join(distPath, '/events--current.xml'), feed.xml())

    return routes
  },
  webpack: (config, { defaultLoaders, stage }) => {
    const stylusLoaders = () => ([
      {
        loader: require.resolve('css-loader'),
        options: {
          minimize: true
        }
      },
      {
        loader: require.resolve('stylus-loader'),
        options: {
          use: [
            stylusMixins(),
            responsiveGrid(),
            poststylus([ autoprefixer ])
          ],
          import: [
            `~stylus-mixins/index.styl`,
            `~responsive-grid/index.styl`,
            path.resolve(__dirname, './src/stylus/_______settings/index.styl')
          ]
        }
      }
    ])

    // if (stage !== 'dev') config.devtool = false

    config.entry = stage === 'dev'
      ? [ 'babel-polyfill', ...config.entry ]
      : [ 'babel-polyfill', config.entry ]

    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.styl$/,
            use: stage === 'dev'
              ? [ require.resolve('style-loader'), ...stylusLoaders() ]
              : ExtractTextPlugin.extract({ use: stylusLoaders() })
          },
          {
            test: /\.svg$/,
            loader: require.resolve('svg-react-loader')
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader
        ]
      }
    ]

    config.plugins.push(new Visualizer({ filename: 'webpack-stats.html' }))

    return config
  },
  Document: Html,
  onBuild: async () => {
    const robots = [
      'User-agent: *'
    ]
    const disallowRobots = JSON.parse(process.env.DISALLOW_ROBOTS)

    if (disallowRobots) robots.push('Disallow: /')
    robots.push(`Sitemap: ${process.env.SITE_URL}/sitemap.xml`)

    await fs.writeFile(path.join(distPath, 'robots.txt'), robots.join('\n'))

    const redirects = [
      { from: `${urlBuilder.profileRootUrl}*`, to: urlBuilder.profileRootUrl, code: 200 },
      { from: `${urlBuilder.currentEventUrl(':clan')}*`, to: urlBuilder.currentEventUrl(':clan'), code: 200 }
    ]

    if (currentEvent) {
      redirects.push({ from: urlBuilder.eventUrl(currentEvent.eventId), to: urlBuilder.currentEventRootUrl, code: 301 })
    } else {
      redirects.push({ from: urlBuilder.currentEventRootUrl, to: '/#next', code: 301 })
    }

    await fs.writeFile(path.join(distPath, '_redirects'), redirects.map(redirect => `${redirect.from} ${redirect.to} ${redirect.code}`).join('\n'))

    const manifest = {
      name: constants.meta.name,
      short_name: constants.meta.shortName,
      start_url: `/`,
      background_color: constants.meta.themeColor,
      theme_color: constants.meta.themeColor,
      display: `minimal-ui`,
      icons: [
        {
          src: `/favicon-192x192.png`,
          sizes: `192x192`,
          type: `image/png`
        },
        {
          src: `/favicon-512x512.png`,
          sizes: `512x512`,
          type: `image/png`
        }
      ]
    }

    await fs.writeFile(path.join(distPath, 'manifest.json'), JSON.stringify(manifest))
  }
}
