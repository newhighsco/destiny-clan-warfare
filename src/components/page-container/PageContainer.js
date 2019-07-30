import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { APIStatusProvider } from '../../contexts/APIStatusContext'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Advert from '../advert/Advert'
import Status from '../status/Status'
import ContentContainer from '../content-container/ContentContainer'
import Meta from '../meta/Meta'
import Landmark from '../landmark/Landmark'
import styles from './PageContainer.styl'

const baseClassName = 'page-container'

const PageContainer = class extends PureComponent {
  render() {
    const { children, apiStatus, meta } = this.props

    return (
      <APIStatusProvider apiStatus={apiStatus}>
        <Meta {...meta} />
        <Landmark id="top" a11yText="Top of page" />
        <Header />
        <Status />
        <main id="content" className={styles[baseClassName]} role="main">
          <ContentContainer
            gutter
            className={styles[`${baseClassName}__inner`]}
          >
            {children}
            <Advert />
          </ContentContainer>
        </main>
        <Footer />
      </APIStatusProvider>
    )
  }
}

PageContainer.propTypes = {
  children: PropTypes.node,
  apiStatus: PropTypes.object,
  meta: PropTypes.object
}

export default PageContainer
