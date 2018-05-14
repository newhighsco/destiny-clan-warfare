import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Prose.styl'

const Prose = ({ children, className }) => {
  return (
    <div className={classNames(styles.prose, className)}>
      {children}
    </div>
  )
}

Prose.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Prose
