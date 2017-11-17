const path = require(`path`)
const crypto = require(`crypto`)
const axios = require(`axios`)
const camelcaseKeys = require(`camelcase-keys`)
const urlBuilder = require('./src/utils/url-builder')

const api = axios.create({
  baseURL: 'https://destinyclanwarfare.azurewebsites.net/api/'
})

const createContentDigest = content => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(content))
    .digest(`hex`)
}

let frontmatterEdges

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const clans = await api(`Clan/GetAllClans`)
  const members = await api(`Clan/GetAllMembers`)
  const histories = await api(`Leaderboard/GetAllPlayersHistory`)
  const modifiers = await api(`Modifier/GetAllModifiers`)
  const events = await require('./src/fixtures/events.json')

  for (let clan of clans.data) {
    const leaderboard = await api(`Leaderboard/GetClanLeaderboard?clanId=${clan.groupId}`)

    createNode({
      id: `${clan.groupId}`,
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
      leaderboard: leaderboard.data.map(item => {
        item = camelcaseKeys(item)
        const member = members.data
          .find(member => member.profileIdStr === item.memberShipIdStr)

        return {
          path: urlBuilder.currentEventUrl(clan.groupId, member.profileIdStr),
          name: member.name,
          icon: member.icon,
          games: item.gamesPlayed,
          wins: item.gamesWon,
          kills: item.kills,
          assists: item.assists,
          deaths: item.deaths,
          score: item.totalScore
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

  for (let member of members.data) {
    const clan = clans.data.find(clan => clan.groupId === member.groupId)
    const history = histories.data
      .filter(history => history.MemberShipIdStr === member.profileIdStr)

    createNode({
      id: member.profileIdStr,
      path: urlBuilder.profileUrl(member.profileIdStr),
      clanId: `${member.groupId}`,
      clan: clan,
      clanSortable: clan.tag.toUpperCase(),
      name: member.name,
      nameSortable: member.name.toUpperCase(),
      icon: member.icon,
      history: history.map(item => {
        item = camelcaseKeys(item)

        return {
          game: {
            path: urlBuilder.pgcrUrl(item.pgcrId),
            isExternal: true,
            result: item.gameWon ? 'win' : 'loss',
            type: item.gameType || '',
            map: item.map || '',
            mapSeparator: item.map ? ' - ' : '',
            date: new Date(item.datePlayed)
          },
          kills: item.kills,
          assists: item.assists,
          deaths: item.deaths,
          score: item.totalScore
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

  for (let modifier of modifiers.data) {
    modifier = camelcaseKeys(modifier)
    createNode({
      id: `Modifier ${modifier.id}`,
      path: `/modifiers/${modifier.id}/`,
      name: modifier.name,
      description: modifier.description,
      scoringModifier: modifier.scoringModifier,
      multiplierModifier: modifier.multiplierModifier,
      scoringBonus: modifier.scoringBonus,
      multiplierBonus: modifier.multiplierBonus,
      parent: null,
      children: [],
      internal: {
        type: `Modifier`,
        contentDigest: createContentDigest(modifier)
      }
    })
  }

  for (let event of events.data) {
    const currentDate = new Date()
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)
    const modifier = modifiers.data
      .filter(modifier => event.modifiers.includes(modifier.Id))
      .map(modifier => camelcaseKeys(modifier))

    createNode({
      id: `Event ${event.id}`,
      path: urlBuilder.eventUrl(event.id),
      name: event.name,
      description: event.description,
      startDate: startDate,
      endDate: endDate,
      isPast: endDate < currentDate,
      isFuture: startDate > currentDate,
      isCurrent: startDate < currentDate && endDate > currentDate,
      modifiers: modifier,
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

  let slug

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
          allEvent {
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
            id: clan.node.id,
            eventId: null
          }
        })
      }))

      Promise.all(result.data.allMember.edges.map(async (member) => {
        createPage({
          path: member.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/member.js`),
          context: {
            id: member.node.id,
            clanId: member.node.clanId,
            eventId: null
          }
        })
      }))

      Promise.all(result.data.allEvent.edges.map(async (event) => {
        const eventPath = event.node.path
        const eventId = event.node.id

        createPage({
          path: eventPath,
          layout: `content`,
          component: path.resolve(`./src/templates/event.js`),
          context: {
            id: eventId
          }
        })

        if (event.node.isCurrent) {
          createRedirect({
            fromPath: urlBuilder.currentEventRootUrl,
            toPath: eventPath
          })

          Promise.all(result.data.allClan.edges.map(async (clan) => {
            createPage({
              path: urlBuilder.currentEventUrl(clan.node.id),
              layout: `content`,
              component: path.resolve(`./src/templates/clan.js`),
              context: {
                id: clan.node.id,
                eventId: eventId
              }
            })
          }))

          Promise.all(result.data.allMember.edges.map(async (member) => {
            createPage({
              path: urlBuilder.currentEventUrl(member.node.clanId, member.node.id),
              layout: `content`,
              component: path.resolve(`./src/templates/member.js`),
              context: {
                id: member.node.id,
                clanId: member.node.clanId,
                eventId: eventId
              }
            })
          }))
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
      let frontmatter = frontmatterEdges.find(edge => edge.node.fileAbsolutePath === page.component)

      if (frontmatter) {
        page.layout = frontmatter.node.data.layout || 'index'
      }

      page.context.slug = page.path
    }

    createPage(page)

    resolve()
  })
}
