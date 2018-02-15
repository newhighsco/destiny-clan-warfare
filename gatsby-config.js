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
    `gatsby-plugin-remove-serviceworker`,
    `@jacobmischka/gatsby-plugin-react-svg`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-109161360-1`
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
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#fff`,
        showSpinner: true
      }
    },
    `gatsby-plugin-no-sourcemaps`,
    // Keep this at the end
    `gatsby-plugin-netlify`
  ]
}
