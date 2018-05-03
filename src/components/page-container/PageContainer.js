import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Advert from '../advert/Advert'
import BungieStatus from '../bungie/Status'
import styles from './PageContainer.styl'

const baseClassName = 'page-container'

const PageContainer = ({ children }) => {
  return (
    <Fragment>
      <a id="top">
        <span className="is-vhidden">Top of page</span>
      </a>
      <Header />
      <BungieStatus />
      <main id="content" className={styles[baseClassName]} role="main">
        <div className={classNames(styles[`${baseClassName}__inner`], 'content-center content-gutter')}>
          {children}
          <Advert />
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node
}

export default PageContainer
