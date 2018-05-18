import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './HoldingPage.styl'

const HoldingPage = class extends PureComponent {
  render () {
    const { children } = this.props

    return (
      <div className={styles['holding-page']}>
        <div className="content-center content-gutter text-center">
          {children}
        </div>
      </div>
    )
  }
}

HoldingPage.propTypes = {
  children: PropTypes.node
}

export default HoldingPage
