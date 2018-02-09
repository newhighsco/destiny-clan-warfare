import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Advert from '../advert/Advert'
import BungieStatus from '../bungie/Status'

import './PageContainer.styl'

const PageContainer = ({ children, status, advert }) => (
  <Fragment>
    <Header />
    <BungieStatus code={status && status.bungieCode} />
    <main id="content" className="page-container" role="main">
      <div className="page-container__inner content-center content-gutter">
        {children}
        {advert &&
          <Advert />
        }
      </div>
    </main>
    <Footer />
  </Fragment>
)

PageContainer.defaultProps = {
  advert: true
}

PageContainer.propTypes = {
  children: PropTypes.node,
  status: PropTypes.object,
  advert: PropTypes.bool
}

export default PageContainer
