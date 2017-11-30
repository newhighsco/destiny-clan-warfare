const path = require(`path`)
const crypto = require(`crypto`)
const axios = require(`axios`)
const camelcaseKeys = require(`camelcase-keys`)
const constants = require('./src/utils/constants')
const medalBuilder = require('./src/utils/medal-builder')
const urlBuilder = require('./src/utils/url-builder')

const api = axios.create({
  baseURL: 'https://destinyclanwarfare.azurewebsites.net/api/',
  timeout: 60000
})

const createContentDigest = content => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(content))
    .digest(`hex`)
}

var frontmatterEdges

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators

  var clans = []
  var members = []
  var histories = []
  var events = []
  var currentEvent
  const casingOptions = { deep: true }
  const updatedDate = new Date()

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

  for (var clan of clans) {
    var clanLeaderboard = []

    await api(`Leaderboard/GetClanLeaderboard?clanId=${clan.groupId}`)
      .then(({ data }) => {
        clanLeaderboard = data.map(item => camelcaseKeys(item, casingOptions))
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
      description: clan.description,
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
        const member = members.find(member => member.profileIdStr === item.memberShipIdStr)

        return {
          path: urlBuilder.eventUrl(currentEvent.eventId, member.groupId, member.profileIdStr),
          id: member.profileIdStr,
          name: member.name,
          icon: member.icon,
          games: item.gamesPlayed,
          wins: item.gamesWon,
          kills: item.kills,
          assists: item.assists,
          deaths: item.deaths,
          score: parseInt(Math.round(item.totalScore))
        }
      }),
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

    var totals = {
      wins: Number.NEGATIVE_INFINITY,
      kills: Number.NEGATIVE_INFINITY,
      assists: Number.NEGATIVE_INFINITY,
      deaths: Number.NEGATIVE_INFINITY,
      score: Number.NEGATIVE_INFINITY,
      lastPlayed: new Date(0)
    }

    if (member.currentScore && member.currentScore.lastSeen) {
      totals = {
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
      clanId: `${member.groupId}`,
      clan: clan,
      clanSortable: clan.tag.toUpperCase(),
      name: member.name,
      nameSortable: member.name.toUpperCase(),
      icon: member.icon,
      totals: totals,
      history: history.map(item => {
        return {
          game: {
            path: item.pgcrId ? urlBuilder.pgcrUrl(item.pgcrId) : '',
            isExternal: true,
            result: item.pgcrId ? (item.gameWon ? constants.result.win : constants.result.loss) : '',
            type: item.gameType,
            map: item.map,
            mapSeparator: item.map ? ' - ' : '',
            date: new Date(item.datePlayed)
          },
          kills: item.kills,
          assists: item.assists,
          deaths: item.deaths,
          score: parseInt(Math.round(item.totalScore))
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
    const parseClans = (rawClans, eventId) => {
      if (!rawClans) return []

      return rawClans.map((rawClan, i) => {
        const clan = clans.find(clan => clan.groupId === (rawClan.clanId || rawClan.id))

        return {
          path: eventId ? urlBuilder.eventUrl(eventId, clan.groupId) : urlBuilder.clanUrl(clan.groupId),
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
          rank: `#${i + 1}`,
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

      largeLeaderboard = parseClans(currentLeaderboard.largeLeaderboard, event.eventId)
      mediumLeaderboard = parseClans(currentLeaderboard.mediumLeaderboard, event.eventId)
      smallLeaderboard = parseClans(currentLeaderboard.smallLeaderboard, event.eventId)
    } else {
      largeLeaderboard = parseClans(event.result.large)
      mediumLeaderboard = parseClans(event.result.medium)
      smallLeaderboard = parseClans(event.result.small)

      parseResults(constants.division.large, largeLeaderboard, results)
      parseResults(constants.division.medium, mediumLeaderboard, results)
      parseResults(constants.division.small, smallLeaderboard, results)
    }

    createNode({
      id: `Event ${event.eventId}`,
      updatedDate: updatedDate,
      path: urlBuilder.eventUrl(event.eventId),
      name: event.name,
      description: event.description || '',
      startDate: startDate,
      endDate: endDate,
      isPast: isPast,
      isFuture: isFuture,
      isCurrent: isCurrent,
      modifiers: event.modifiers,
      leaderboards: {
        large: largeLeaderboard,
        medium: mediumLeaderboard,
        small: smallLeaderboard
      },
      results: results,
      parent: null,
      children: [],
      internal: {
        type: `Event`,
        contentDigest: createContentDigest(event)
      }
    })
  }
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  var slug

  if (node.internal.type === `JSFrontmatter`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    const parsedName = parsedFilePath.name === `index` ? `` : parsedFilePath.name

    slug = path.posix.join(`/`, parsedFilePath.dir, parsedName, `/`)

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug })
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
              }
            }
          }
          allMember {
            edges {
              node {
                id
                path
                clanId
              }
            }
          }
          allEvent(sort: { fields: [ startDate ], order: DESC }) {
            edges {
              node {
                id
                path
                isCurrent
              }
            }
          }
          allJsFrontmatter {
            edges {
              node {
                fileAbsolutePath
                data {
                  layout
                }
                fields {
                  slug
                }
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

      frontmatterEdges = result.data.allJsFrontmatter.edges

      Promise.all(result.data.allClan.edges.map(async (clan) => {
        createPage({
          path: clan.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/clan.js`),
          context: {
            id: clan.node.id
          }
        })
      }))

      Promise.all(result.data.allMember.edges.map(async (member) => {
        createPage({
          path: member.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/member.js`),
          context: {
            id: member.node.id
          }
        })
      }))

      Promise.all(result.data.allEvent.edges.map(async (event) => {
        const eventPath = event.node.path

        createPage({
          path: eventPath,
          layout: `content`,
          component: path.resolve(`./src/templates/event.js`),
          context: {
            id: event.node.id
          }
        })

        if (event.node.isCurrent) {
          const currentEventRedirects = [
            urlBuilder.currentEventRootUrl,
            urlBuilder.currentEventRootUrl.replace(/\/$/, '')
          ]

          currentEventRedirects.forEach(fromPath => {
            createRedirect({
              fromPath: fromPath,
              toPath: eventPath,
              isPermanent: true,
              redirectInBrowser: true
            })
          })

          Promise.all(result.data.allClan.edges.map(async (clan) => {
            createPage({
              path: urlBuilder.eventUrl(event.node.path, clan.node.id),
              layout: `content`,
              component: path.resolve(`./src/templates/event-clan.js`),
              context: {
                id: clan.node.id
              }
            })
          }))

          Promise.all(result.data.allMember.edges.map(async (member) => {
            createPage({
              path: urlBuilder.eventUrl(event.node.path, member.node.clanId, member.node.id),
              layout: `content`,
              component: path.resolve(`./src/templates/event-member.js`),
              context: {
                id: member.node.id,
                clanId: member.node.clanId
              }
            })
          }))
        } else {
          createRedirect({
            fromPath: urlBuilder.eventUrl(eventPath, ':clan'),
            toPath: eventPath,
            isPermanent: true,
            redirectInBrowser: true
          })

          createRedirect({
            fromPath: urlBuilder.eventUrl(eventPath, ':clan/:profile'),
            toPath: eventPath,
            isPermanent: true,
            redirectInBrowser: true
          })
        }
      }))
    })

    resolve()
  })
}

exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    if (frontmatterEdges) {
      var frontmatter = frontmatterEdges.find(edge => edge.node.fileAbsolutePath === page.component)

      if (frontmatter) {
        page.layout = frontmatter.node.data.layout || 'index'
      }

      page.context.slug = page.path
    }

    createPage(page)

    resolve()
  })
}
