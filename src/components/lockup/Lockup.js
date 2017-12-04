import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Lockup.styl'

const absoluteUrl = require('../../utils/absolute-url')
const baseClassName = 'lockup'

const Lockup = ({ heading, headingHref, kicker, kickerHref, reverse, center, borderless, primary, className, element, children }) => {
  const commonAttributes = {
    className: classNames(
      baseClassName
      , className
      , reverse && `${baseClassName}--reverse`
      , center && `${baseClassName}--center`
      , borderless && `${baseClassName}--borderless`
      , primary && `${baseClassName}--primary`
    )
  }

  const kickerElement = heading ? 'span' : element
  const headingElement = element || 'h1'

  const Kicker = () => <LockupElement element={kickerElement} elementName="kicker" href={kickerHref}>{kicker}</LockupElement>
  const Heading = () => <LockupElement element={headingElement} elementName="heading" href={headingHref}>{heading}</LockupElement>
  const Content = () => <LockupElement elementName="content">{children}</LockupElement>

  return (
    <span {...commonAttributes}>
      {reverse ? ([
        <Heading key="heading" />,
        <Kicker key="kicker" />,
        <Content key="content" />
      ]) : ([
        <Kicker key="kicker" />,
        <Heading key="heading" />,
        <Content key="content" />
      ])}
    </span>
  )
}

Lockup.propTypes = {
  heading: PropTypes.string,
  headingHref: PropTypes.string,
  kicker: PropTypes.string,
  kickerHref: PropTypes.string,
  reverse: PropTypes.bool,
  center: PropTypes.bool,
  primary: PropTypes.bool,
  borderless: PropTypes.bool,
  className: PropTypes.string,
  element: PropTypes.string,
  children: PropTypes.node
}

const LockupElement = ({ children, element, elementName, href }) => {
  const Element = element
  const commonAttributes = {
    className: `${baseClassName}__${elementName}`
  }

  if (children) {
    if (!href) {
      return (
        <Element {...commonAttributes}>{children}</Element>
      )
    }

    if (absoluteUrl(href)) {
      return (
        <a href={href} {...commonAttributes}>
          <Element>{children}</Element>
        </a>
      )
    }

    return (
      <Link to={href} {...commonAttributes}>
        <Element>{children}</Element>
      </Link>
    )
  }

  return (null)
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

export {
  Lockup,
  LockupElement
}
