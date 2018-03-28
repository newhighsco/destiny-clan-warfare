import React from 'react'
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Button.styl'

const absoluteUrl = require('../../utils/absolute-url')
const baseClassName = 'button'

const Button = (props) => {
  const { children, className, href, target, type, size, solid, ...remainingProps } = props
  const commonAttributes = {
    className: classNames(
      baseClassName,
      size && `${baseClassName}--${size}`,
      solid && `${baseClassName}--solid`,
      className
    )
  }

  if (!href) {
    return (
      <button
        {...remainingProps}
        {...commonAttributes}
        type={type}
      >
        {children}
      </button>
    )
  }

  if (absoluteUrl(href)) {
    return (
      <a
        {...remainingProps}
        {...commonAttributes}
        type={null}
        href={href}
        {...target && { target }}
        {...target === '_blank' && { rel: 'noopener noreferrer' }}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      {...remainingProps}
      {...commonAttributes}
      to={href}
    >
      {children}
    </Link>
  )
}

Button.defaultProps = {
  type: 'button'
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  type: PropTypes.oneOf([ 'button', 'reset', 'submit' ]),
  size: PropTypes.oneOf([ 'small' ]),
  solid: PropTypes.bool
}

const ButtonGroup = ({ children, className }) => {
  if (!children) return null

  return (
    <div className={classNames(
      `${baseClassName}-group`,
      className
    )}>
      {children}
    </div>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export {
  Button,
  ButtonGroup
}
