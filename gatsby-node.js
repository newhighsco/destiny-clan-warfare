const path = require(`path`)
const crypto = require(`crypto`)
const axios = require(`axios`)

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
  const modifiers = await require('./src/fixtures/modifiers.json')
  const events = await require('./src/fixtures/events.json')

  for (let clan of clans.data) {
    const leaderboard = await api(`Leaderboard/GetClanLeaderboard?clanId=${clan.groupId}`)

    createNode({
      id: `${clan.groupId}`,
      path: `/clans/${clan.groupId}/`,
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
      leaderboard: leaderboard.data.map(leader => {
        const member = members.data.find(member => member.profileIdStr === leader.MemberShipIdStr)

        return {
          path: `/members/${member.profileIdStr}/`,
          name: member.name,
          icon: member.icon,
          played: leader.GamesPlayed,
          wins: leader.GamesWon,
          kills: leader.Kills,
          assists: leader.Assists,
          deaths: leader.Deaths,
          score: leader.TotalScore
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

    createNode({
      id: member.profileIdStr,
      path: `/members/${member.profileIdStr}/`,
      clanId: `${member.groupId}`,
      clan: clan,
      clanSortable: clan.tag.toUpperCase(),
      name: member.name,
      nameSortable: member.name.toUpperCase(),
      icon: member.icon,
      history: [],
      parent: null,
      children: [],
      internal: {
        type: `Member`,
        contentDigest: createContentDigest(member)
      }
    })
  }

  for (let modifier of modifiers.data) {
    createNode({
      id: `Modifier ${modifier.id}`,
      path: `/modifiers/${modifier.id}/`,
      name: modifier.name,
      description: modifier.description,
      parent: null,
      children: [],
      internal: {
        type: `Modifier`,
        contentDigest: createContentDigest(modifier)
      }
    })
  }

  for (let event of events.data) {
    createNode({
      id: `Event ${event.id}`,
      path: `/events/${event.id}/`,
      name: event.name,
      type: event.type,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      modifiers: [],
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
  const { createPage } = boundActionCreators

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

      Promise.all(result.data.allClan.edges.map(async (edge) => {
        createPage({
          path: edge.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/clan.js`),
          context: {
            id: edge.node.id
          }
        })
      }))

      Promise.all(result.data.allMember.edges.map(async (edge) => {
        createPage({
          path: edge.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/member.js`),
          context: {
            id: edge.node.id,
            clanId: edge.node.clanId
          }
        })
      }))

      Promise.all(result.data.allEvent.edges.map(async (edge) => {
        createPage({
          path: edge.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/event.js`),
          context: {
            id: edge.node.id
          }
        })
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
