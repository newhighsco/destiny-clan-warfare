import React, { PureComponent } from 'react'
import { Link } from '@reach/router'
import { OutboundLink } from 'react-ga-donottrack'
import PropTypes from 'prop-types'

const absoluteUrl = require('../../utils/absolute-url')

const SmartLink = class extends PureComponent {
  render() {
    const {
      children,
      className,
      href,
      target,
      eventLabel,
      type,
      state,
      ...rest
    } = this.props

    if (!href) {
      return (
        <button className={className} type={type} {...rest}>
          {children}
        </button>
      )
    }

    if (absoluteUrl(href)) {
      return (
        <OutboundLink
          className={className}
          type={null}
          to={href}
          eventLabel={eventLabel || href}
          {...target && { target }}
          {...target === '_blank' && { rel: 'noopener noreferrer' }}
          {...rest}
        >
          {children}
        </OutboundLink>
      )
    }

    return (
      <Link className={className} to={href} state={state} {...rest}>
        {children}
      </Link>
    )
  }
}

SmartLink.defaultProps = {
  type: 'button',
  state: {}
}

SmartLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  eventLabel: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  state: PropTypes.object
}

export default SmartLink
