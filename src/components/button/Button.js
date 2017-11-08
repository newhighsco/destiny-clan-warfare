import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Button = (props) => {
  const { children, className, href, target, type } = props
  const absoluteUrlRegEx = /^\w[\w-.+]+:/ // http://regexr.com/3fhfg
  const commonAttributes = {
    className: classNames('button', className)
  }

  if (!href) {
    return (
      <button
        type={type}
        {...commonAttributes}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (absoluteUrlRegEx.exec(href)) {
    return (
      <a
        href={href}
        {...target && { target }}
        {...target === '_blank' && { rel: 'noopener' }}
        {...commonAttributes}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={href}
      {...commonAttributes}
      {...props}
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
