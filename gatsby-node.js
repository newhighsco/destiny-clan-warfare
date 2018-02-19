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

const enableProfilePages = JSON.parse(process.env.GATSBY_ENABLE_PROFILE_PAGES)
const enableMatchHistory = JSON.parse(process.env.GATSBY_ENABLE_MATCH_HISTORY)
var currentEvent

exports.sourceNodes = async ({ boundActionCreators, reporter }) => {
  const { createNode } = boundActionCreators

  var apiStatus = {
    enrollmentOpen: false,
    bungieStatus: constants.bungie.disabledStatusCode,
    updatedDate: new Date()
  }
  var clans = []
  var leaderboards = []
  var members = []
  var histories = []
  var events = []
  var modifiers = []
  var medals = []
  var currentLeaderboard
  const casingOptions = { deep: true }
  const linkifyOptions = { attributes: { target: '_blank' } }

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

  const parseMedals = (input, type, minimumTier) => {
    minimumTier = minimumTier || 0
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

      if (parsed.tier <= minimumTier) return

      if (existing) {
        existing.label = existing.label.concat(parsed.label)
      } else {
        output.push(parsed)
      }
    })

    return output
  }
  const sources = [
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch last tracked game`)
      activity.start()

      api(`Leaderboard/GetLastTrackedGame`)
        .then(({ data }) => {
          if (data.DatePlayed) apiStatus.updatedDate = new Date(data.DatePlayed)
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch enrollment status`)
      activity.start()

      api(`Clan/AcceptingNewClans`)
        .then(({ data }) => {
          apiStatus.enrollmentOpen = data
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
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
          resolve()
        })
        .catch(err => {
          reporter.error(err)
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
          resolve()
        })
        .catch(err => reporter.error(err))
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch members`)
      activity.start()

      api(`Clan/GetAllMembers`)
        .then(({ data }) => {
          members = data.map(item => camelcaseKeys(item, casingOptions))
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
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
          resolve()
        })
        .catch(err => {
          reporter.error(err)
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
          resolve()
        })
        .catch(err => {
          reporter.error(err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch member medals`)
      activity.start()

      api(`Component/GetAllMedals`)
        .then(({ data }) => {
          medals = medals.concat(parseMedals(data, constants.prefix.profile))
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch clan medals`)
      activity.start()

      api(`Component/GetAllClanMedals`)
        .then(({ data }) => {
          medals = medals.concat(parseMedals(data, constants.prefix.clan))
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch event leaderboard`)
      activity.start()

      api(`Leaderboard/GetLeaderboard`)
        .then(({ data }) => {
          currentLeaderboard = camelcaseKeys(data, casingOptions)
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
          reject(err)
        })
    }),
    new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch clan leaderboard`)
      activity.start()

      api(`Leaderboard/GetClanLeaderboard`)
        .then(({ data }) => {
          leaderboards = camelcaseKeys(data, casingOptions)
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
          reject(err)
        })
    })
  ]

  if (enableMatchHistory) {
    sources.push(new Promise((resolve, reject) => {
      const activity = reporter.activityTimer(`fetch match history`)
      activity.start()

      api(`Leaderboard/GetAllPlayersHistory`)
        .then(({ data }) => {
          histories = data.map(item => camelcaseKeys(item, casingOptions))
          activity.end()
          resolve()
        })
        .catch(err => {
          reporter.error(err)
          reject(err)
        })
    }))
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

  await Promise.all(clans.map(clan => {
    var clanLeaderboard = leaderboards.filter(item => item.clanId === clan.groupId)

    return createNode({
      id: `${clan.groupId}`,
      currentEventId: currentEvent.eventId,
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
      leaderboard: clanLeaderboard.map(item => {
        const member = members.find(member => member.profileIdStr === item.idStr)

        if (!member) throw new Error(`Cannot find member: ${item.idStr}`)

        return {
          path: urlBuilder.eventUrl(currentEvent.eventId, member.groupId, member.profileIdStr),
          id: member.profileIdStr,
          name: decode(member.name),
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
          bonuses: parseBonuses(item),
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
  }))

  activity.end()

  activity = reporter.activityTimer(`create member nodes`)
  activity.start()

  await Promise.all(members.map(member => {
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
      score: Number.NEGATIVE_INFINITY,
      bonusPoints1: { modifierId: 1, bonusPoints: Number.NEGATIVE_INFINITY }
    }

    if (history.length === 0) history = [ emptyHistory ]

    var memberLeaderboard = leaderboards.find(({ idStr }) => idStr === member.profileIdStr)

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
      currentEventId: currentEvent.eventId,
      path: urlBuilder.profileUrl(member.profileIdStr),
      clanId: `${constants.prefix.hash}${member.groupId}`,
      clanName: decode(clan.name),
      clanPath: urlBuilder.clanUrl(member.groupId),
      clanTag: decode(clan.tag),
      clanSortable: clan.tag.toUpperCase(),
      name: decode(member.name),
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
            path: urlBuilder.pgcrUrl(item.pgcrId),
            isExternal: true,
            result: item.gameWon === true ? constants.result.win : (item.gameWon === false ? constants.result.loss : ''),
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
  }))

  activity.end()

  activity = reporter.activityTimer(`create event nodes`)
  activity.start()

  await Promise.all(events.map(event => {
    var hasResults = false

    const parseClans = (rawClans, eventId, isCurrent) => {
      if (!rawClans) return []

      return rawClans.map((rawClan, i) => {
        const clan = clans.find(clan => clan.groupId === (rawClan.clanId || rawClan.id))

        if (!clan) throw new Error(`Cannot find clan: ${rawClan.clanId || rawClan.id}`)

        return {
          path: isCurrent ? urlBuilder.eventUrl(eventId, clan.groupId) : urlBuilder.clanUrl(clan.groupId, eventId),
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

    if (isCurrent && endDate < apiStatus.updatedDate) {
      isCurrent = false
      isPast = true
    }

    if (isCurrent) {
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
      results: results.filter(({ score }) => score > 0),
      medals: {
        clans: event.clanMedals ? parseMedals(event.clanMedals, constants.prefix.clan, 1) : [],
        members: event.clanMemberMedals ? parseMedals(event.clanMemberMedals, constants.prefix.profile, 1) : []
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

      activity = reporter.activityTimer(`create event pages and redirects`)
      activity.start()

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
            const curentEventActivity = reporter.activityTimer(`create current event pages and redirects`)
            curentEventActivity.start()

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

            curentEventActivity.end()
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

      activity.end()
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

exports.onPostBuild = ({ graphql, reporter }) => {
  const disallowRobots = JSON.parse(process.env.GATSBY_DISALLOW_ROBOTS)
  const robots = [
    `Sitemap: ${process.env.GATSBY_SITE_URL}/sitemap.xml`,
    'User-agent: *'
  ]

  if (disallowRobots) robots.push('Disallow: /')

  fs.writeFileSync('./public/robots.txt', robots.join('\n'))

  if (enableProfilePages) {
    var activity = reporter.activityTimer(`build profile pages`)
    activity.start()

    return new Promise((resolve, reject) => {
      graphql(
        `
          {
            allMember {
              edges {
                node {
                  id
                  path
                  name
                  clanId
                  clanName
                  clanTag
                  clanPath
                  totalsVisible
                  leaderboardVisible
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

        const memberHtml = fs.readFileSync('./src/html/member.html', 'utf-8')
        const eventMemberHtml = fs.readFileSync('./src/html/event-member.html', 'utf-8')
        const htmlReplace = (html, member, eventPath, clanPath, memberPath) => {
          return html
            .replace(/%MEMBER_ID%/g, member.id)
            .replace(/%MEMBER_NAME%/g, member.name)
            .replace(/%MEMBER_PATH%/g, memberPath || member.path)
            .replace(/%CLAN_NAME%/g, member.clanName)
            .replace(/%CLAN_PATH%/g, clanPath || member.clanPath)
            .replace(/%CLAN_TAG%/g, member.clanTag)
            .replace(/%EVENT_PATH%/g, eventPath || '')
            .replace(/%SITE_URL%/g, process.env.GATSBY_SITE_URL)
        }

        Promise.all(result.data.allMember.edges.map(async ({ node }) => {
          const clanId = node.clanId.substring(constants.prefix.hash.length)

          if (node.totalsVisible) {
            const directory = `./public${node.path}`
            const html = htmlReplace(memberHtml, node)

            fs.mkdirSync(directory)
            fs.writeFileSync(`${directory}index.html`, html)
          }

          if (currentEvent && node.leaderboardVisible) {
            const eventPath = urlBuilder.eventUrl(currentEvent.eventId)
            const clanPath = urlBuilder.eventUrl(eventPath, clanId)
            const path = urlBuilder.eventUrl(eventPath, clanId, node.id)
            const directory = `./public${path}`
            const html = htmlReplace(eventMemberHtml, node, eventPath, clanPath, path)

            fs.mkdirSync(directory)
            fs.writeFileSync(`${directory}index.html`, html)
          }
        }))
      })

      activity.end()
      resolve()
    })
  }
}
