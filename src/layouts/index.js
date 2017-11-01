import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.styl'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Destiny Clan Wars"
      meta={[
        { name: 'description', content: 'Destiny Clan Wars' },
      ]}
    />
    <div>
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
