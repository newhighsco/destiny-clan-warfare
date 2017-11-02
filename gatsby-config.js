module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-stylus',
      options: {
        use: []
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Destiny Clan Warfare',
        short_name: 'Clan Warfare'
      }
    },
    'gatsby-plugin-offline',
    '@jacobmischka/gatsby-plugin-react-svg'
  ]
}
