import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ContentContainer from '../content-container/ContentContainer'
import Meta from '../meta/Meta'
import Landmark from '../landmark/Landmark'
import styles from './PageContainer.styl'

const baseClassName = 'page-container'

const PageContainer = class extends PureComponent {
  render() {
    const { children, meta } = this.props

    return (
      <Fragment>
        <Meta {...meta} />
        <Landmark id="top" a11yText="Top of page" />
        <Header />
        <main id="content" className={styles[baseClassName]} role="main">
          <ContentContainer
            gutter
            className={styles[`${baseClassName}__inner`]}
          >
            {children}
          </ContentContainer>
        </main>
        <Footer />
      </Fragment>
    )
  }
}

PageContainer.propTypes = {
  children: PropTypes.node,
  meta: PropTypes.object
}

export default PageContainer
