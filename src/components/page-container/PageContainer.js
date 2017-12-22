import React from 'react'
import PropTypes from 'prop-types'
import Advert from '../advert/Advert'

import './PageContainer.styl'

const PageContainer = ({ children }) => (
  <main id="content" className="page-container" role="main">
    <div className="page-container__inner content-center content-gutter">
      {children}
      <Advert />
    </div>
  </main>
)

PageContainer.propTypes = {
  children: PropTypes.node
}

export default PageContainer
