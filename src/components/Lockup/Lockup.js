import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Lockup = ({ children, heading, kicker, className }) => {
  const baseClassName = 'lockup'

  return (
    <span className={classNames(baseClassName, className)}>
      {kicker &&
        <span className="lockup__kicker">{kicker} </span>
      }
      <span className="lockup__heading">{heading}</span>
      {children &&
        <span className="lockup__content">
          {children}
        </span>
      }
    </span>
  )
}

Lockup.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string.isRequired,
  kicker: PropTypes.string,
  className: PropTypes.string
}

export default Lockup
