import React from 'react'
import PropTypes from 'prop-types'

const PageContainer = ({ children }) => (
  <main id="content" className="page-container" role="main">
    <div className="page-container__inner content-center content-gutter">
      {children}
    </div>
  </main>
)

PageContainer.propTypes = {
  children: PropTypes.node
}

export default PageContainer
