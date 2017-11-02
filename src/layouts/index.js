import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../stylus/index.styl'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Destiny Clan Warfare - Coming soon"
      meta={[
        { name: 'description', content: 'Wage war against other clans in Destiny 2 and battle your way to the top of the Destiny 2 clan leaderboard' }
      ]}
      htmlAttributes={
        { lang: 'en' }
      }
    />
    <div>
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
