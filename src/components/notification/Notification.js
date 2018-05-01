import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Notification.styl'

const Notification = ({ children, state, id }) => {
  const baseClassName = 'notification'

  return (
    <div id={id} className={classNames(styles[baseClassName], state && styles[`${baseClassName}--${state}`])}>
      <div className={styles[`${baseClassName}__inner`]}>
        {children}
      </div>
    </div>
  )
}

Notification.propTypes = {
  children: PropTypes.node,
  state: PropTypes.oneOf([ 'warning', 'error', 'success', 'notice' ]),
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

export default Notification
