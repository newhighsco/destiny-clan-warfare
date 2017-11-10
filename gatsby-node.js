const path = require(`path`)
const crypto = require(`crypto`)
const axios = require(`axios`)

const baseApiUrl = 'https://destinyclanwarfare.azurewebsites.net/api/'

const fetch = endpoint => {
  const url = `${baseApiUrl}${endpoint}`
  return axios.get(url)
}

const createContentDigest = content => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(content))
    .digest(`hex`)
}

let frontmatterEdges

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const clans = await fetch(`Clan/GetAllClans`)

  clans.data.forEach(clan => {
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
      parent: null,
      children: [],
      internal: {
        type: `Clan`,
        contentDigest: createContentDigest(clan)
      }
    })
  })

  const members = await fetch(`Clan/GetAllMembers`)

  members.data.forEach(member => {
    const clan = clans.data.find(clan => clan.groupId === member.groupId)

    createNode({
      id: `${member.profileId}`,
      path: `/members/${member.profileId}/`,
      clanId: `${member.groupId}`,
      clan: clan,
      clanSortable: clan.tag.toUpperCase(),
      name: member.name,
      nameSortable: member.name.toUpperCase(),
      icon: member.icon,
      points: '-',
      parent: null,
      children: [],
      internal: {
        type: `Member`,
        contentDigest: createContentDigest(member)
      }
    })
  })

  const modifiers = require('./src/fixtures/modifiers.json')

  modifiers.data.forEach(modifier => {
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
  })

  // const result = await fetch('Tournament/GetCurrentTournament')
  // const tournaments = [ result.data ]

  // tournaments.forEach(tournament => createNode({
  //   id: `tournament/${tournament.id}`,
  //   name: tournament.Name,
  //   startDate: tournament.StartDate,
  //   endDate: tournament.EndDate,
  //   modifiers: tournament.TournamentModifiers,
  //   parent: null,
  //   children: [],
  //   internal: {
  //     type: `Tournament`,
  //     contentDigest: createContentDigest(tournament)
  //   }
  // }))
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

      result.data.allClan.edges.forEach(edge => {
        createPage({
          path: edge.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/clan.js`),
          context: {
            id: edge.node.id
          }
        })
      })

      result.data.allMember.edges.forEach(edge => {
        createPage({
          path: edge.node.path,
          layout: `content`,
          component: path.resolve(`./src/templates/member.js`),
          context: {
            id: edge.node.id,
            clanId: edge.node.clanId
          }
        })
      })

      frontmatterEdges = result.data.allJsFrontmatter.edges
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
