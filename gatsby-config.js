require('dotenv').config({ path: `./.env.${process.env.NODE_ENV || 'development'}` })

const path = require('path')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const constants = require('./src/utils/constants')

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
    title: constants.meta.title,
    description: constants.meta.description
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    `gatsby-transformer-javascript-static-exports`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-stylus`,
      options: {
        use: [
          stylusMixins(),
          responsiveGrid()
        ],
        import: [
          `~stylus-mixins/index.styl`,
          `~responsive-grid/index.styl`,
          path.resolve(__dirname, './src/stylus/_______settings/index.styl')
        ]
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: process.env.SITE_URL
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
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
    },
    // Keep this after gatsby-plugin-manifest
    `gatsby-plugin-offline`,
    `@jacobmischka/gatsby-plugin-react-svg`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-109161360-1`,
        anonymize: false
      }
    },
    {
      resolve: `gatsby-plugin-sentry`,
      options: {
        dsn: `https://d16928953a68480ca15b7377fef94cd7@sentry.io/249072`
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { allEvent } }) => {
              const allEvents = allEvent.edges
              const pastEvents = allEvents.filter(({ node }) => node.isPast)
              const futureEvents = allEvents.filter(({ node }) => node.isFuture)
              const previousEvent = pastEvents[0]
              const nextEvent = futureEvents[0]

              return allEvents.map(({ node }) => {
                let kicker = node.isCurrent ? constants.kicker.current : (node.isPast ? constants.kicker.past : constants.kicker.future)

                if (node.path === previousEvent.path) kicker = constants.kicker.previous
                if (node.path === nextEvent.path) kicker = constants.kicker.next

                const url = `${process.env.SITE_URL}${node.path}`
                const description = node.description
                const content = `${kicker} ${url} ${description}`

                return {
                  title: `${node.name} - ${kicker}`,
                  description: description,
                  url: url,
                  guid: url,
                  date: node.startDate,
                  custom_elements: [
                    {
                      'content:encoded': content
                    }
                  ]
                }
              })
            },
            query: `
              {
                allEvent(sort: { fields: [ startDate ], order: DESC }, filter: { visible: { eq: true } }) {
                  edges {
                    node {
                      path
                      name
                      description
                      startDate
                      isCurrent
                      isPast
                    }
                  }
                }
              }
            `,
            output: `/events.xml`
          }
        ]
      }
    },
    // Keep this at the end
    `gatsby-plugin-netlify`
  ]
}
