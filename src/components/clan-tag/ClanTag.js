import React from 'react'
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './ClanTag.styl'

const ClanTag = ({ children, className, href }) => {
  const baseClassName = 'clan-tag'
  const classes = classNames(baseClassName, className)

  return (
    <Link to={href} className={classes}>{children}</Link>
  )
}

ClanTag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string
}

export default ClanTag
