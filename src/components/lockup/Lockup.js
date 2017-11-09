import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const baseClassName = 'lockup'

const Lockup = ({ heading, headingHref, kicker, kickerHref, className, element }) => {
  const commonAttributes = {
    className: classNames(baseClassName, className)
  }

  return (
    <span {...commonAttributes}>
      <LockupElement elementName="kicker" href={kickerHref}>{kicker}</LockupElement>
      <LockupElement element={element} elementName="heading" href={headingHref}>{heading}</LockupElement>
    </span>
  )
}

Lockup.defaultProps = {
  element: 'h1'
}

Lockup.propTypes = {
  heading: PropTypes.string,
  headingHref: PropTypes.string,
  kicker: PropTypes.string,
  kickerHref: PropTypes.string,
  className: PropTypes.string,
  element: PropTypes.string
}

const LockupElement = ({ children, element, elementName, href }) => {
  const absoluteUrlRegEx = /^\w[\w-.+]+:/ // http://regexr.com/3fhfg
  const Element = element

  if (children) {
    if (!href) {
      return (
        <Element className={`${baseClassName}__${elementName}`}>{children}</Element>
      )
    }

    if (absoluteUrlRegEx.exec(href)) {
      return (
        <a href={href} className={`${baseClassName}__${elementName}`}>{children}</a>
      )
    }

    return (
      <Link to={href} className={`${baseClassName}__${elementName}`}>{children}</Link>
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

export default Lockup
