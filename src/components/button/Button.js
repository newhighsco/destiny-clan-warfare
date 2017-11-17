import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Button.styl'

const Button = (props) => {
  const { children, className, href, target, type } = props
  const absoluteUrlRegEx = /^\w[\w-.+]+:/ // http://regexr.com/3fhfg
  const commonAttributes = {
    className: classNames('button', className)
  }

  if (!href) {
    return (
      <button
        {...props}
        {...commonAttributes}
        type={type}
      >
        {children}
      </button>
    )
  }

  if (absoluteUrlRegEx.exec(href)) {
    return (
      <a
        {...props}
        {...commonAttributes}
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
      {...props}
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
  type: PropTypes.oneOf([ 'button', 'reset', 'submit' ])
}

export default Button
