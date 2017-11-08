import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Lockup = ({ children, heading, kicker, className, element }) => {
  const baseClassName = 'lockup'
  const Element = element

  return (
    <span className={classNames(baseClassName, className)}>
      {kicker &&
        <span className="lockup__kicker">{kicker} </span>
      }
      <Element className="lockup__heading">{heading}</Element>
      {children &&
        <span className="lockup__content">
          {children}
        </span>
      }
    </span>
  )
}

Lockup.defaultProps = {
  element: 'h1'
}

Lockup.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string.isRequired,
  kicker: PropTypes.string,
  className: PropTypes.string,
  element: PropTypes.string
}

export default Lockup
