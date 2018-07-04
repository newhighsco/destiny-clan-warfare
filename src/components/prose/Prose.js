import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Prose.styl'

class Prose extends PureComponent {
  render () {
    const { children, className } = this.props

    return (
      <div className={classNames(styles.prose, className)}>
        {children}
      </div>
    )
  }
}

Prose.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Prose
