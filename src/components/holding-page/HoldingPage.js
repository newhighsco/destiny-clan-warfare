import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Meta from '../meta/Meta'
import styles from './HoldingPage.styl'

const HoldingPage = class extends PureComponent {
  render () {
    const { children, meta } = this.props

    return (
      <div className={styles['holding-page']}>
        <Meta {...meta} />
        <div className="content-center content-gutter text-center">
          {children}
        </div>
      </div>
    )
  }
}

HoldingPage.propTypes = {
  children: PropTypes.node,
  meta: PropTypes.object
}

export default HoldingPage
