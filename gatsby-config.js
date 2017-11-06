const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')

module.exports = {
  siteMetadata: {
    enableIdentity: true,
    siteUrl: `https://destinyclanwarfare.com`,
    title: `Destiny Clan Warfare`,
    description: `Wage war against other clans in Destiny 2 and battle your way to the top of the Destiny 2 clan leaderboard`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-stylus`,
      options: {
        use: [
          stylusMixins(),
          responsiveGrid()
        ]
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Destiny Clan Warfare`,
        short_name: `Clan Warfare`,
        start_url: `/`,
        background_color: `#222`,
        theme_color: `#222`,
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
    // Keep this at the end
    `gatsby-plugin-netlify`
  ]
}
