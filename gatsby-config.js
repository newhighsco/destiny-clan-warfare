require('dotenv').config()

const path = require('path')
const autoprefixer = require('autoprefixer')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const constants = require('./src/utils/constants')
const feedBuilder = require('./src/utils/feed-builder')
const poststylus = require('poststylus')

module.exports = {
  siteMetadata: {
    siteUrl: process.env.GATSBY_SITE_URL,
    title: constants.meta.title,
    description: constants.meta.description
  },
  plugins: [
    `gatsby-plugin-react-next`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-stylus`,
      options: {
        use: [
          stylusMixins(),
          responsiveGrid(),
          poststylus([ autoprefixer ])
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
        siteUrl: process.env.GATSBY_SITE_URL
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
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
            allEvent(sort: { fields: [ startDate ], order: DESC }, filter: { visible: { eq: true } }) {
              edges {
                node {
                  path
                  name
                  description
                  startDate
                  isCurrent
                  isPast
                  isFuture
                }
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allEvent } }) => feedBuilder(allEvent),
            output: `/events.xml`
          },
          {
            serialize: ({ query: { site, allEvent } }) => feedBuilder(allEvent, constants.kicker.current),
            output: `/events--current.xml`
          },
          {
            serialize: ({ query: { site, allEvent } }) => feedBuilder(allEvent, constants.kicker.past),
            output: `/events--past.xml`
          },
          {
            serialize: ({ query: { site, allEvent } }) => feedBuilder(allEvent, constants.kicker.future),
            output: `/events--future.xml`
          },
          {
            serialize: ({ query: { site, allEvent } }) => feedBuilder(allEvent, constants.kicker.previous),
            output: `/events--previous.xml`
          },
          {
            serialize: ({ query: { site, allEvent } }) => feedBuilder(allEvent, constants.kicker.next),
            output: `/events--next.xml`
          }
        ]
      }
    },
    // Keep this at the end
    `gatsby-plugin-netlify`
  ]
}
