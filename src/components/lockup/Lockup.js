import React, { Fragment, PureComponent } from 'react'
import { Link } from '@reach/router'
import { OutboundLink } from 'react-ga-donottrack'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Lockup.styl'

const absoluteUrl = require('../../utils/absolute-url')

const baseClassName = 'lockup'

class Lockup extends PureComponent {
  render() {
    const {
      heading,
      headingHref,
      kicker,
      kickerHref,
      kickerAttributes,
      reverse,
      center,
      borderless,
      primary,
      className,
      id,
      element,
      children
    } = this.props
    const commonAttributes = {
      id,
      className: classNames(
        styles[baseClassName],
        reverse && styles[`${baseClassName}--reverse`],
        center && styles[`${baseClassName}--center`],
        borderless && styles[`${baseClassName}--borderless`],
        primary && styles[`${baseClassName}--primary`],
        className
      )
    }

    const kickerElement = heading ? 'span' : element
    const headingElement = element || 'h1'

    const Kicker = () => (
      <LockupElement
        element={kickerElement}
        elementName="kicker"
        href={kickerHref}
        {...kickerAttributes}
      >
        {kicker}
      </LockupElement>
    )
    const Heading = () => (
      <LockupElement
        element={headingElement}
        elementName="heading"
        href={headingHref}
      >
        {heading}
      </LockupElement>
    )
    const Content = () => (
      <LockupElement elementName="content">{children}</LockupElement>
    )

    return (
      <span {...commonAttributes}>
        {reverse ? (
          <Fragment>
            <Heading />
            <Kicker />
          </Fragment>
        ) : (
          <Fragment>
            <Kicker />
            <Heading />
          </Fragment>
        )}
        <Content />
      </span>
    )
  }
}

Lockup.propTypes = {
  heading: PropTypes.string,
  headingHref: PropTypes.string,
  kicker: PropTypes.string,
  kickerHref: PropTypes.string,
  kickerAttributes: PropTypes.object,
  reverse: PropTypes.bool,
  center: PropTypes.bool,
  primary: PropTypes.bool,
  borderless: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  element: PropTypes.string,
  children: PropTypes.node
}

const LockupElement = class extends PureComponent {
  render() {
    const { children, element, elementName, href, ...rest } = this.props
    const Element = element
    const commonAttributes = {
      className: styles[`${baseClassName}__${elementName}`],
      ...rest
    }

    if (children) {
      if (!href) {
        return <Element {...commonAttributes}>{children}</Element>
      }

      if (absoluteUrl(href)) {
        return (
          <OutboundLink to={href} eventLabel={href} {...commonAttributes}>
            <Element>{children}</Element>
          </OutboundLink>
        )
      }

      return (
        <Link to={href} {...commonAttributes}>
          <Element>{children}</Element>
        </Link>
      )
    }

    return null
  }
}

LockupElement.defaultProps = {
  element: 'span'
}

LockupElement.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string,
  elementName: PropTypes.string,
  href: PropTypes.string
}

export { Lockup, LockupElement }
