import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Advert from '../advert/Advert'
import BungieStatus from '../bungie/Status'

import './PageContainer.styl'

const PageContainer = ({ children, status }) => (
  <Fragment>
    <Header />
    <BungieStatus code={status.bungieCode} />
    <main id="content" className="page-container" role="main">
      <div className="page-container__inner content-center content-gutter">
        {children}
        <Advert />
      </div>
    </main>
    <Footer />
  </Fragment>
)

PageContainer.propTypes = {
  children: PropTypes.node,
  status: PropTypes.object
}

export default PageContainer
