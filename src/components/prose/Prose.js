import React from 'react'
import PropTypes from 'prop-types'
import styles from './Prose.styl'

const Prose = ({ children }) => {
  return (
    <div className={styles.prose}>
      {children}
    </div>
  )
}

Prose.propTypes = {
  children: PropTypes.node
}

export default Prose
