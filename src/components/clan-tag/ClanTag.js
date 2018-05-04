import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './ClanTag.styl'

const ClanTag = class extends PureComponent {
  render () {
    const { children, className, href } = this.props
    const baseClassName = 'clan-tag'
    const classes = classNames(styles[baseClassName], className)

    return (
      <Link to={href} className={classes}>{children}</Link>
    )
  }
}

ClanTag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string
}

export default ClanTag
