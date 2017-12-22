import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Notification.styl'

const Notification = ({ children, state }) => {
  const baseClassName = 'notification'

  return (
    <div className={classNames(baseClassName, state && `${baseClassName}--${state}`)}>
      <div className={`${baseClassName}__inner`}>
        {children}
      </div>
    </div>
  )
}

Notification.propTypes = {
  children: PropTypes.node,
  state: PropTypes.oneOf([ 'warning', 'error', 'success', 'notice' ])
}

export default Notification
