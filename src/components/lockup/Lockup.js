import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const baseClassName = 'lockup'

const Lockup = ({ children, href, heading, kicker, className, element }) => {
  const absoluteUrlRegEx = /^\w[\w-.+]+:/ // http://regexr.com/3fhfg
  const commonAttributes = {
    className: classNames(baseClassName, className)
  }

  if (!href) {
    return (
      <span {...commonAttributes}>
        <LockupElement elementName="kicker">{kicker}</LockupElement>
        <LockupElement element={element} elementName="heading">{heading}</LockupElement>
        <LockupElement elementName="content">{children}</LockupElement>
      </span>
    )
  }

  if (absoluteUrlRegEx.exec(href)) {
    return (
      <a href={href} {...commonAttributes}>
        <LockupElement elementName="kicker">{kicker}</LockupElement>
        <LockupElement element={element} elementName="heading">{heading}</LockupElement>
        <LockupElement elementName="content">{children}</LockupElement>
      </a>
    )
  }

  return (
    <Link to={href} {...commonAttributes}>
      <LockupElement elementName="kicker">{kicker}</LockupElement>
      <LockupElement element={element} elementName="heading">{heading}</LockupElement>
      <LockupElement elementName="content">{children}</LockupElement>
    </Link>
  )
}

Lockup.defaultProps = {
  element: 'h1'
}

Lockup.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  heading: PropTypes.string,
  kicker: PropTypes.string,
  className: PropTypes.string,
  element: PropTypes.string
}

const LockupElement = ({ children, element, elementName }) => {
  const Element = element

  if (children) {
    return (
      <Element className={`${baseClassName}__${elementName}`}>{children}</Element>
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
  elementName: PropTypes.string
}

export default Lockup
