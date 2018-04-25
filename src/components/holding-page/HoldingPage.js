import React from 'react'
import PropTypes from 'prop-types'
import styles from './HoldingPage.styl'

const HoldingPage = ({ children }) => (
  <div className={styles['holding-page']}>
    <div className="content-center content-gutter text-center">
      {children}
    </div>
  </div>
)

HoldingPage.propTypes = {
  children: PropTypes.node
}

export default HoldingPage
