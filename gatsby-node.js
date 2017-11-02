// const axios = require(`axios`)
// const crypto = require(`crypto`)
// const path = require(`path`)

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

// exports.createPages = ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators

//   return new Promise((resolve, reject) => {
//     graphql(
//       `
//         {
//           allClan {
//             edges {
//               node {
//                 id
//                 name
//               }
//             }
//           }
//         }
//       `
//     )
//     .then(result => {
//       result.data.allClan.edges.forEach(edge => {
//         createPage({
//           path: edge.node.id,
//           component: path.resolve(`./src/templates/clan.js`),
//           context: {
//             id: edge.node.id
//           }
//         })
//       })
//     })
//     resolve()
//   })
// }
