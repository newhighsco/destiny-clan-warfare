import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.styl'

const absoluteUrl = require('../../utils/absolute-url')
const baseClassName = 'button'

const Button = class extends PureComponent {
  render () {
    const { children, className, href, target, type, size, solid, prefetch, state, ...remainingProps } = this.props
    const commonAttributes = {
      className: classNames(
        styles[baseClassName],
        size && styles[`${baseClassName}--${size}`],
        solid && styles[`${baseClassName}--solid`],
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
          <span>{children}</span>
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
          <span>{children}</span>
        </a>
      )
    }

    return (
      <Link
        {...remainingProps}
        {...commonAttributes}
        to={{ pathname: href, state: state }}
        prefetch={prefetch}
      >
        <span>{children}</span>
      </Link>
    )
  }
}

Button.defaultProps = {
  type: 'button',
  prefetch: true,
  state: {}
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  type: PropTypes.oneOf([ 'button', 'reset', 'submit' ]),
  size: PropTypes.oneOf([ 'small' ]),
  solid: PropTypes.bool,
  prefetch: PropTypes.bool,
  state: PropTypes.object
}

const ButtonGroup = class extends PureComponent {
  render () {
    const { children, className } = this.props

    if (!children) return null

    return (
      <div className={classNames(
        styles[`${baseClassName}-group`],
        className
      )}>
        {children}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export {
  Button,
  ButtonGroup
}
