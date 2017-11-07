const path = require(`path`)
// const axios = require(`axios`)
// const crypto = require(`crypto`)

let frontmatterEdges

// exports.sourceNodes = async ({ boundActionCreators }) => {
//   const { createNode } = boundActionCreators
//   const data = await axios.get(`https://dog.ceo/api/breeds/list/all`)

//   Object.keys(data.data.message).map(clan => createNode({
//     id: `clan/${clan}`,
//     name: clan,
//     parent: null,
//     children: [],
//     internal: {
//       type: `Clan`,
//       contentDigest: crypto
//         .createHash(`md5`)
//         .update(JSON.stringify(clan))
//         .digest(`hex`)
//     }
//   }))
// }

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
  // const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          # allClan {
          #   edges {
          #     node {
          #       id
          #       name
          #     }
          #   }
          # }
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

      // result.data.allClan.edges.forEach(edge => {
      //   createPage({
      //     path: edge.node.id,
      //     component: path.resolve(`./src/templates/clan.js`),
      //     context: {
      //       id: edge.node.id
      //     }
      //   })
      // })

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
