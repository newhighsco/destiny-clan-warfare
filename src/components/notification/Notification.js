import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Notification.styl'

const Notification = ({ children, state, id }) => {
  const baseClassName = 'notification'

  return (
    <div id={id} className={classNames(baseClassName, state && `${baseClassName}--${state}`)}>
      <div className={`${baseClassName}__inner`}>
        {children}
      </div>
    </div>
  )
}

Notification.propTypes = {
  children: PropTypes.node,
  state: PropTypes.oneOf([ 'warning', 'error', 'success', 'notice' ]),
  id: PropTypes.string
}

export default Notification
