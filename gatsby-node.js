require('dotenv').config()

const path = require(`path`)
const fs = require(`fs`)
const camelcaseKeys = require(`camelcase-keys`)
const constants = require('./src/utils/constants')
const medalBuilder = require('./src/utils/medal-builder')
const urlBuilder = require('./src/utils/url-builder')
const createContentDigest = require('./src/utils/create-content-digest')
const api = require('./src/utils/api-helper').api
const bungie = require('./src/utils/bungie-helper')
const linkify = require('linkify-urls')
const decode = require('./src/utils/html-entities').decode

const enableMatchHistory = JSON.parse(process.env.GATSBY_ENABLE_MATCH_HISTORY)
const enablePreviousLeaderboards = JSON.parse(process.env.GATSBY_ENABLE_PREVIOUS_LEADERBOARDS)
var currentEvent

exports.sourceNodes = async ({ boundActionCreators, reporter }) => {
  const { createNode } = boundActionCreators

  var apiStatus = {
    enrollmentOpen: false,
    bungieStatus: constants.bungie.disabledStatusCode,
    updatedDate: new Date()
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
  var previousEventId
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
      const activity = reporter.activityTimer(`fetch enrollment open`)
      activity.start()

      api(`Clan/AcceptingNewClans`)
        .then(({ data }) => {
          apiStatus.enrollmentOpen = data
          activity.end()
          reporter.info(`enrollment open: ${apiStatus.enrollmentOpen}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch enrollment open', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch bungie api status`)
      activity.start()

      bungie(`/Destiny2/Manifest`)
        .then(({ data }) => {
          if (data.ErrorCode) apiStatus.bungieStatus = data.ErrorCode
          activity.end()
          reporter.info(`bungie api status: ${apiStatus.bungieStatus}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch bungie api status', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch clans`)
      activity.start()

      api(`Clan/GetAllClans`)
        .then(({ data }) => {
          clans = data.map(item => camelcaseKeys(item, casingOptions))
          activity.end()
          reporter.info(`clans: ${clans.length}`)
          resolve()
        })
        .catch(err => reporter.error('fetch clans', err))
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch members`)
      activity.start()

      api(`Clan/GetAllMembers`)
        .then(({ data }) => {
          members = data.map(item => camelcaseKeys(item, casingOptions))
          activity.end()
          reporter.info(`members: ${members.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch members', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch events`)
      activity.start()

      api(`Event/GetAllEvents`)
        .then(({ data }) => {
          events = data.map(item => camelcaseKeys(item, casingOptions))
          currentEvent = events.find(event => event.eventTense === constants.tense.current)
          activity.end()
          reporter.info(`events: ${events.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch events', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch modifiers`)
      activity.start()

      api(`Component/GetAllModifiers`)
        .then(({ data }) => {
          modifiers = data.map(item => parseModifier(camelcaseKeys(item, casingOptions)))
          activity.end()
          reporter.info(`modifiers: ${modifiers.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch modifiers', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch member medals`)
      activity.start()

      api(`Component/GetAllMedals`)
        .then(({ data }) => {
          medals = medals.concat(medalBuilder.parseMedals(data, constants.prefix.profile))
          activity.end()
          reporter.info(`member medals: ${data.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch member medals', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch clan medals`)
      activity.start()

      api(`Component/GetAllClanMedals`)
        .then(({ data }) => {
          medals = medals.concat(medalBuilder.parseMedals(data, constants.prefix.clan))
          activity.end()
          reporter.info(`clan medals: ${data.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch clan medals', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch event leaderboard`)
      activity.start()

      api(`Leaderboard/GetLeaderboard`)
        .then(({ data }) => {
          currentEventLeaderboard = camelcaseKeys(data, casingOptions)
          activity.end()
          reporter.info(`event leaderboard: ${currentEventLeaderboard !== null}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch event leaderboard', err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch current clan leaderboard`)
      activity.start()

      api(`Leaderboard/GetClanLeaderboard`)
        .then(({ data }) => {
          currentMemberLeaderboards = camelcaseKeys(data, casingOptions)
          activity.end()
          reporter.info(`current clan leaderboard: ${currentMemberLeaderboards.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch current clan leaderboard', err)
          reject(err)
        })
    })
  ]

  if (enablePreviousLeaderboards) {
    sources.push(new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch previous clan leaderboard`)
      activity.start()

      api(`Leaderboard/GetPreviousClanLeaderboard`)
        .then(({ data }) => {
          previousMemberLeaderboards = camelcaseKeys(data[0].LeaderboardList, casingOptions)
          previousEventId = data[0].EventId
          activity.end()
          reporter.info(`previous clan leaderboard: ${previousMemberLeaderboards.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch previous clan leaderboard', err)
          reject(err)
        })
    }))
  } else {
    reporter.info('fetch previous clan leaderboard disabled')
  }

  if (enableMatchHistory) {
    sources.push(new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch match history`)
      activity.start()

      api(`Leaderboard/GetAllPlayersHistory`)
        .then(({ data }) => {
          histories = data.Data.map(item => camelcaseKeys(item, casingOptions))
          activity.end()
          reporter.info(`match history: ${histories.length}`)
          resolve()
        })
        .catch(err => {
          reporter.error('fetch match history', err)
          reject(err)
        })
    }))
  } else {
    reporter.info('fetch match history disabled')
  }

  await Promise.all(sources)

  fs.writeFileSync('./public/api-status.json', JSON.stringify(apiStatus))

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

  var activity = reporter.activityTimer(`create clan nodes`)
  activity.start()

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
          if (isCurrent) reporter.error(`Cannot find member: ${item.idStr}`)
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
          updatedDate: new Date(member.lastchecked || 0)
        }
      })
    }

    return createNode({
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
      medals: medalBuilder.parseMedals(clan.medalUnlocks, constants.prefix.clan),
      parent: null,
      children: [],
      internal: {
        type: `Clan`,
        contentDigest: createContentDigest(clan)
      }
    })
  }))

  activity.end()

  activity = reporter.activityTimer(`create member nodes`)
  activity.start()

  await Promise.all(members.map(member => {
    const clan = clans.find(clan => clan.groupId === member.groupId)
    const historyCount = constants.matchHistoryLimit
    var history = histories.filter(history => history.memberShipIdStr === member.profileIdStr).slice(0, historyCount)

    const emptyHistory = {
      pgcrId: null,
      gameType: '',
      map: '',
      datePlayed: 0,
      kills: Number.NEGATIVE_INFINITY,
      assists: Number.NEGATIVE_INFINITY,
      deaths: Number.NEGATIVE_INFINITY,
      score: Number.NEGATIVE_INFINITY,
      bonusPoints1: { modifierId: 1, bonusPoints: Number.NEGATIVE_INFINITY }
    }

    if (history.length === 0) history = [ emptyHistory ]

    var memberLeaderboard = currentMemberLeaderboards.find(({ idStr }) => idStr === member.profileIdStr)

    var leaderboard = {
      games: Number.NEGATIVE_INFINITY,
      wins: Number.NEGATIVE_INFINITY,
      kills: Number.NEGATIVE_INFINITY,
      assists: Number.NEGATIVE_INFINITY,
      deaths: Number.NEGATIVE_INFINITY,
      score: Number.NEGATIVE_INFINITY,
      bonuses: []
    }

    if (memberLeaderboard) {
      leaderboard = {
        games: memberLeaderboard.gamesPlayed,
        wins: memberLeaderboard.gamesWon,
        kills: memberLeaderboard.kills,
        assists: memberLeaderboard.assists,
        deaths: memberLeaderboard.deaths,
        score: parseInt(Math.round(memberLeaderboard.totalScore)),
        bonuses: parseBonuses(memberLeaderboard)
      }
    }

    var totals = {
      games: Number.NEGATIVE_INFINITY,
      wins: Number.NEGATIVE_INFINITY,
      kills: Number.NEGATIVE_INFINITY,
      assists: Number.NEGATIVE_INFINITY,
      deaths: Number.NEGATIVE_INFINITY,
      score: Number.NEGATIVE_INFINITY,
      lastPlayed: new Date(0)
    }

    if (member.currentScore && member.currentScore.lastSeen) {
      totals = {
        games: member.currentScore.gamesPlayed,
        wins: member.currentScore.gamesWon,
        kills: member.currentScore.kills,
        assists: member.currentScore.assists,
        deaths: member.currentScore.deaths,
        score: parseInt(Math.round(member.currentScore.totalScore)),
        lastPlayed: new Date(member.currentScore.lastSeen)
      }
    }

    return createNode({
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
            endDate: new Date(item.datePlayed)
          },
          kills: item.kills,
          assists: item.assists,
          deaths: item.deaths,
          score: parseInt(Math.round(item.totalScore)),
          bonuses: parseBonuses(item)
        }
      }),
      updatedDate: new Date(member.lastchecked || 0),
      parent: null,
      children: [],
      internal: {
        type: `Member`,
        contentDigest: createContentDigest(member)
      }
    })
  }))

  activity.end()

  activity = reporter.activityTimer(`create event nodes`)
  activity.start()

  await Promise.all(events.map(event => {
    var hasResults = false

    const parseClans = (rawClans, eventId, isCurrent) => {
      if (!rawClans) return []

      return rawClans.map((rawClan, i) => {
        const clanId = rawClan.clanId || rawClan.id
        const clan = clans.find(clan => clan.groupId === clanId)
        const platforms = clanPlatforms.find(({ id }) => id === clanId)

        if (!clan) {
          reporter.error(`Cannot find clan: ${clanId}`)
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

    const startDate = new Date(event.startTime)
    const endDate = new Date(event.scoringEndTime)
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

    return createNode({
      id: `${constants.prefix.event} ${event.eventId}`,
      path: isCurrent ? urlBuilder.currentEventUrl() : urlBuilder.eventUrl(event.eventId),
      name: event.name,
      description: event.description || '',
      startDate: startDate,
      endDate: endDate,
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
      },
      parent: null,
      children: [],
      internal: {
        type: constants.prefix.event,
        contentDigest: createContentDigest(event)
      }
    })
  }))

  activity.end()
}

exports.createPages = ({ graphql, boundActionCreators, reporter }) => {
  const { createPage, createRedirect } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allClan {
            edges {
              node {
                id
                path
                leaderboardVisible
              }
            }
          }
          allMember {
            edges {
              node {
                id
                path
                clanId
                totalsVisible
                leaderboardVisible
              }
            }
          }
          allEvent {
            edges {
              node {
                id
                path
                isCurrent
                visible
              }
            }
          }
        }
      `
    )
    .then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      var activity = reporter.activityTimer(`create clan pages`)
      activity.start()

      Promise.all(result.data.allClan.edges.map(async (clan) => {
        createPage({
          path: clan.node.path,
          component: path.resolve(`./src/templates/clan.js`),
          context: {
            id: clan.node.id,
            clanId: `${constants.prefix.hash}${clan.node.id}`
          }
        })
      }))

      activity.end()

      activity = reporter.activityTimer(`create event pages`)
      activity.start()

      Promise.all(result.data.allEvent.edges.map(async (event) => {
        if (event.node.visible) {
          createPage({
            path: event.node.path,
            component: path.resolve(`./src/templates/event.js`),
            context: {
              id: event.node.id
            }
          })

          if (event.node.isCurrent) {
            const curentEventActivity = reporter.activityTimer(`create current event sub-pages`)
            curentEventActivity.start()

            createRedirect({
              fromPath: urlBuilder.eventUrl(event.node.id),
              toPath: urlBuilder.currentEventUrl(),
              isPermanent: false,
              redirectInBrowser: true
            })

            Promise.all(result.data.allClan.edges.map(async (clan) => {
              if (clan.node.leaderboardVisible) {
                createPage({
                  path: urlBuilder.currentEventUrl(clan.node.id),
                  component: path.resolve(`./src/templates/event-clan.js`),
                  context: {
                    id: clan.node.id,
                    clanId: `${constants.prefix.hash}${clan.node.id}`
                  }
                })
              }
            }))

            curentEventActivity.end()
          }
        }
      }))

      if (!currentEvent) {
        createRedirect({
          fromPath: urlBuilder.currentEventUrl(),
          toPath: '/#next',
          isPermanent: false,
          redirectInBrowser: true
        })
      }

      activity.end()
    })

    resolve()
  })
}

exports.onPostBuild = ({ graphql, reporter }) => {
  const disallowRobots = JSON.parse(process.env.GATSBY_DISALLOW_ROBOTS)
  const robots = [
    `Sitemap: ${process.env.GATSBY_SITE_URL}/sitemap.xml`,
    'User-agent: *'
  ]

  if (disallowRobots) robots.push('Disallow: /')

  fs.writeFileSync('./public/robots.txt', robots.join('\n'))
}
