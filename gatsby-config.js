require('dotenv').config({ path: `./.env.${process.env.NODE_ENV || 'development'}` })

const path = require('path')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const constants = require('./src/utils/constants')

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
    name: constants.name,
    title: `${constants.name} - Band together, Guardians`,
    description: `Wage war against other clans in Destiny 2 and battle your way to the top of the Destiny 2 clan leaderboard`,
    handle: `@destinyclanwar`
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
        name: constants.name,
        short_name: `D2 Clan Wars`,
        start_url: `/`,
        background_color: `#404040`,
        theme_color: `#404040`,
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
    // Keep this at the end
    `gatsby-plugin-netlify`
  ]
}
