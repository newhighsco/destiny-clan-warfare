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
        short_name: 'Clan Warfare',
        start_url: '/',
        background_color: '#222',
        theme_color: '#222',
        display: 'minimal-ui'
      }
    },
    'gatsby-plugin-offline',
    '@jacobmischka/gatsby-plugin-react-svg'
  ]
}
