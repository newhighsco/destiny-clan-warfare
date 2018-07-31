import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Notification.styl'

const baseClassName = 'notification'

class Notification extends PureComponent {
  render () {
    const { children, state, id, html } = this.props

    return (
      <div id={id} className={classNames(styles[baseClassName], state && styles[`${baseClassName}--${state}`])}>
        <div className={styles[`${baseClassName}__inner`]} {...html && { dangerouslySetInnerHTML: { __html: html } }}>
          {children}
        </div>
      </div>
    )
  }
}

Notification.propTypes = {
  children: PropTypes.node,
  state: PropTypes.oneOf([ 'warning', 'error', 'success', 'notice' ]),
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  html: PropTypes.string
}

export default Notification
