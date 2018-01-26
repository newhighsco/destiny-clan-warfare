require('dotenv').config()

const path = require(`path`)
const fs = require(`fs`)
const camelcaseKeys = require(`camelcase-keys`)
const constants = require('./src/utils/constants')
const medalBuilder = require('./src/utils/medal-builder')
const urlBuilder = require('./src/utils/url-builder')
const createContentDigest = require('./src/utils/create-content-digest')
const api = require('./src/utils/api-helper')
const bungie = require('./src/utils/bungie-helper')
const linkify = require('linkify-urls')

var currentEvent
var enrollmentOpen = false
const updatedDate = new Date()

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    // turn off source-maps
    config.merge({ devtool: false })
  }
}

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators

  var clans = []
  var leaderboards = []
  var members = []
  var histories = []
  var events = []
  var modifiers = []
  var medals = []
  const casingOptions = { deep: true }
  const linkifyOptions = { attributes: { target: '_blank' } }

  await api(`Clan/AcceptingNewClans`)
    .then(({ data }) => {
      enrollmentOpen = data
    })
    .catch(err => console.log(err))

  await bungie(`/Destiny2/Milestones`)
    .then(({ data }) => {
      createNode({
        id: `API status`,
        updatedDate: updatedDate,
        enrollmentOpen: enrollmentOpen,
        bungieCode: data.ErrorCode,
        bungieMessage: data.ErrorStatus,
        parent: null,
        children: [],
        internal: {
          type: `ApiStatus`,
          contentDigest: createContentDigest(data)
        }
      })
    })
    .catch(err => console.log(err))

  await api(`Clan/GetAllClans`)
    .then(({ data }) => {
      clans = data.map(item => camelcaseKeys(item, casingOptions))
    })
    .catch(err => console.log(err))

  await api(`Clan/GetAllMembers`)
    .then(({ data }) => {
      members = data.map(item => camelcaseKeys(item, casingOptions))
    })
    .catch(err => console.log(err))

  await api(`Leaderboard/GetAllPlayersHistory`)
    .then(({ data }) => {
      histories = data.map(item => camelcaseKeys(item, casingOptions))
    })
    .catch(err => console.log(err))

  await api(`Event/GetAllEvents`)
    .then(({ data }) => {
      events = data.map(item => camelcaseKeys(item, casingOptions))
      currentEvent = events.find(event => event.eventTense === constants.tense.current)
    })
    .catch(err => console.log(err))

  const parseModifier = (modifier) => {
    const member = members.find(member => member.profileIdStr === modifier.createdBy)
    const creator = {
      id: member ? member.profileIdStr : '',
      name: member ? member.name : ''
    }

    return {
      ...modifier,
      shortName: modifier.shortName || modifier.name.split(' ')[0],
      creator: creator
    }
  }

  await api(`Component/GetAllModifiers`)
    .then(({ data }) => {
      modifiers = data.map(item => parseModifier(camelcaseKeys(item, casingOptions)))
    })
    .catch(err => console.log(err))

  const parseMedals = (input, type) => {
    const output = []
    const parseMedal = (medal, type) => {
      return {
        id: medal.id || medal.medalId || medal.unlockId,
        type: type,
        tier: medal.tier || medal.medalTier || 1,
        name: medal.name,
        description: medal.description,
        count: medal.count || null,
        label: [ medal.awardedTo ] || []
      }
    }

    input.map(medal => {
      const parsed = parseMedal(camelcaseKeys(medal, casingOptions), type)
      const existing = output.find(({ id, type }) => id === parsed.id && type === parsed.type)

      if (existing) {
        existing.label = existing.label.concat(parsed.label)
      } else {
        output.push(parsed)
      }
    })

    return output
  }

  await api(`Component/GetAllMedals`)
    .then(({ data }) => {
      medals = medals.concat(parseMedals(data, constants.prefix.profile))
    })
    .catch(err => console.log(err))

  await api(`Component/GetAllClanMedals`)
    .then(({ data }) => {
      medals = medals.concat(parseMedals(data, constants.prefix.clan))
    })
    .catch(err => console.log(err))

  const parseBonuses = (item) => {
    const bonuses = [ item.bonusPoints1, item.bonusPoints2, item.bonusPoints3 ]

    return bonuses.filter(bonus => bonus).map(bonus => {
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

  for (var clan of clans) {
    var clanLeaderboard = []

    await api(`Leaderboard/GetClanLeaderboard?clanId=${clan.groupId}`)
      .then(({ data }) => {
        clanLeaderboard = data.map(item => camelcaseKeys(item, casingOptions))

        leaderboards.push({
          id: clan.groupId,
          leaderboard: clanLeaderboard
        })
      })
      .catch(err => console.log(err))

    createNode({
      id: `${clan.groupId}`,
      updatedDate: updatedDate,
      currentEventId: currentEvent.eventId,
      path: urlBuilder.clanUrl(clan.groupId),
      name: clan.name,
      nameSortable: clan.name.toUpperCase(),
      tag: clan.tag,
      motto: clan.motto,
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
      leaderboard: clanLeaderboard.map(item => {
        const member = members.find(member => member.profileIdStr === item.idStr)

        return {
          path: urlBuilder.eventUrl(currentEvent.eventId, member.groupId, member.profileIdStr),
          id: member.profileIdStr,
          name: member.name,
          icon: member.icon,
          tags: member.bonusUnlocks.map(bonus => {
            return {
              name: bonus.name || '',
              description: bonus.description || ''
            }
          }),
          games: item.gamesPlayed,
          wins: item.gamesWon,
          kills: item.kills,
          assists: item.assists,
          deaths: item.deaths,
          modifiers: parseBonuses(item),
          score: parseInt(Math.round(item.totalScore))
        }
      }),
      leaderboardVisible: clanLeaderboard.length > 0,
      medals: parseMedals(clan.medalUnlocks, constants.prefix.clan),
      parent: null,
      children: [],
      internal: {
        type: `Clan`,
        contentDigest: createContentDigest(clan)
      }
    })
  }

  for (var member of members) {
    const clan = clans.find(clan => clan.groupId === member.groupId)
    var history = histories.filter(history => history.memberShipIdStr === member.profileIdStr)

    const emptyHistory = {
      pgcrId: null,
      gameType: '',
      map: '',
      datePlayed: 0,
      kills: Number.NEGATIVE_INFINITY,
      assists: Number.NEGATIVE_INFINITY,
      deaths: Number.NEGATIVE_INFINITY,
      score: Number.NEGATIVE_INFINITY
    }

    if (history.length === 0) history = [ emptyHistory ]

    var memberLeaderboard = leaderboards
      .find(({ id }) => id === member.groupId)
      .leaderboard
      .find(({ idStr }) => idStr === member.profileIdStr)

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

    createNode({
      id: member.profileIdStr,
      updatedDate: updatedDate,
      currentEventId: currentEvent.eventId,
      path: urlBuilder.profileUrl(member.profileIdStr),
      clanId: `${constants.prefix.hash}${member.groupId}`,
      clan: clan,
      clanSortable: clan.tag.toUpperCase(),
      name: member.name,
      nameSortable: member.name.toUpperCase(),
      icon: member.icon,
      tags: member.bonusUnlocks.map(bonus => {
        return {
          name: bonus.name || '',
          description: bonus.description || ''
        }
      }),
      medals: parseMedals(member.medalUnlocks, constants.prefix.profile),
      totals: totals,
      totalsVisible: totals.games > 0,
      totalsSortable: totals.lastPlayed,
      leaderboard: leaderboard,
      leaderboardVisible: leaderboard.games > 0,
      history: history.map(item => {
        return {
          game: {
            path: item.pgcrId ? urlBuilder.pgcrUrl(item.pgcrId) : '',
            isExternal: true,
            result: item.pgcrId ? (item.gameWon === true ? constants.result.win : (item.gameWon === false ? constants.result.loss : '')) : '',
            type: item.gameType,
            map: item.map,
            mapSeparator: item.map ? ' - ' : '',
            date: new Date(item.datePlayed)
          },
          kills: item.kills,
          assists: item.assists,
          deaths: item.deaths,
          score: parseInt(Math.round(item.totalScore)),
          bonuses: parseBonuses(item)
        }
      }),
      parent: null,
      children: [],
      internal: {
        type: `Member`,
        contentDigest: createContentDigest(member)
      }
    })
  }

  for (var event of events) {
    var hasResults = false

    const parseClans = (rawClans, eventId, isCurrent) => {
      if (!rawClans) return []

      return rawClans.map((rawClan, i) => {
        const clan = clans.find(clan => clan.groupId === (rawClan.clanId || rawClan.id))

        return {
          path: isCurrent ? urlBuilder.eventUrl(eventId, clan.groupId) : urlBuilder.clanUrl(clan.groupId, eventId),
          name: clan.name,
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
          score: parseInt(Math.round(rawClan.score || rawClan.totalScore))
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
    const isFuture = event.eventTense === constants.tense.future
    const results = []
    var largeLeaderboard = []
    var mediumLeaderboard = []
    var smallLeaderboard = []

    if (isCurrent && endDate < updatedDate) {
      isCurrent = false
      isPast = true
    }

    if (isCurrent) {
      var currentLeaderboard

      await api(`Leaderboard/GetLeaderboard`)
        .then(({ data }) => {
          currentLeaderboard = camelcaseKeys(data, casingOptions)
        })
        .catch(err => console.log(err))

      largeLeaderboard = parseClans(currentLeaderboard.largeLeaderboard, event.eventId, true)
      mediumLeaderboard = parseClans(currentLeaderboard.mediumLeaderboard, event.eventId, true)
      smallLeaderboard = parseClans(currentLeaderboard.smallLeaderboard, event.eventId, true)
    } else {
      largeLeaderboard = parseClans(event.result.large, event.eventId)
      mediumLeaderboard = parseClans(event.result.medium, event.eventId)
      smallLeaderboard = parseClans(event.result.small, event.eventId)

      parseResults(constants.division.large, largeLeaderboard, results)
      parseResults(constants.division.medium, mediumLeaderboard, results)
      parseResults(constants.division.small, smallLeaderboard, results)
    }

    createNode({
      id: `${constants.prefix.event} ${event.eventId}`,
      updatedDate: updatedDate,
      path: urlBuilder.eventUrl(event.eventId),
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
      results: results,
      medals: {
        clans: event.clanMedals ? parseMedals(event.clanMedals, constants.prefix.clan) : [],
        members: event.clanMemberMedals ? parseMedals(event.clanMemberMedals, constants.prefix.profile) : []
      },
      parent: null,
      children: [],
      internal: {
        type: constants.prefix.event,
        contentDigest: createContentDigest(event)
      }
    })
  }

  for (var modifier of modifiers) {
    createNode({
      id: `${constants.prefix.modifier} ${modifier.id}`,
      name: modifier.name,
      description: modifier.description,
      creator: modifier.creator,
      scoringModifier: modifier.scoringModifier,
      multiplierModifier: modifier.multiplierModifier,
      scoringBonus: modifier.scoringBonus,
      multiplierBonus: modifier.multiplierBonus,
      parent: null,
      children: [],
      internal: {
        type: constants.prefix.modifier,
        contentDigest: createContentDigest(modifier)
      }
    })
  }

  for (var medal of medals) {
    createNode({
      ...medal,
      id: `${constants.prefix.medal} ${medal.type}${medal.id}`,
      nameSortable: medal.name.toUpperCase(),
      parent: null,
      children: [],
      internal: {
        type: constants.prefix.medal,
        contentDigest: createContentDigest(medal)
      }
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
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

      Promise.all(result.data.allEvent.edges.map(async (event) => {
        if (event.node.visible) {
          const eventPath = event.node.path
          const eventId = event.node.id

          createPage({
            path: eventPath,
            component: path.resolve(`./src/templates/event.js`),
            context: {
              id: eventId
            }
          })

          if (event.node.isCurrent) {
            Promise.all(result.data.allClan.edges.map(async (clan) => {
              if (clan.node.leaderboardVisible) {
                createPage({
                  path: urlBuilder.eventUrl(eventPath, clan.node.id),
                  component: path.resolve(`./src/templates/event-clan.js`),
                  context: {
                    id: clan.node.id
                  }
                })
              }
            }))
          } else {
            const eventHash = eventId.substring(constants.prefix.event.length).trim()

            createRedirect({
              fromPath: urlBuilder.eventUrl(eventPath, ':clan'),
              toPath: urlBuilder.clanUrl(':clan', eventHash),
              isPermanent: true,
              redirectInBrowser: true
            })

            createRedirect({
              fromPath: urlBuilder.eventUrl(eventPath, ':clan/:profile'),
              toPath: urlBuilder.profileUrl(':profile', eventHash),
              isPermanent: true,
              redirectInBrowser: true
            })
          }
        }
      }))

      const currentEventRedirects = [
        urlBuilder.currentEventRootUrl,
        urlBuilder.currentEventRootUrl.replace(/\/$/, '')
      ]

      currentEventRedirects.forEach(fromPath => {
        createRedirect({
          fromPath: fromPath,
          toPath: currentEvent ? urlBuilder.eventUrl(currentEvent.eventId) : '/',
          isPermanent: false,
          redirectInBrowser: true
        })
      })
    })

    resolve()
  })
}

exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise(resolve => {
    if (page.matchPath || page.path.match(/dev-404-page/)) {
      resolve()
    }

    if (page.path.match(`${urlBuilder.profileRootUrl}`)) {
      page.matchPath = urlBuilder.profileUrl(':path')
      createPage(page)
    }

    if (page.path.match(`${urlBuilder.eventRootUrl}`)) {
      page.matchPath = urlBuilder.eventUrl(':path')
      createPage(page)
    }

    resolve()
  })
}

exports.onPostBuild = () => {
  const disallowRobots = JSON.parse(process.env.GATSBY_DISALLOW_ROBOTS)
  const robots = [
    `Sitemap: ${process.env.GATSBY_SITE_URL}/sitemap.xml`,
    'User-agent: *'
  ]

  if (disallowRobots) robots.push('Disallow: /')

  fs.writeFileSync('./public/robots.txt', robots.join('\n'))
}
