import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../stylus/index.styl'

const TemplateWrapper = ({ children, data }) => (
  <div className="site-container">
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description }
      ]}
      htmlAttributes={
        { lang: 'en' }
      }
    />
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default TemplateWrapper

export const query = graphql`
  query templateWrapperQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
