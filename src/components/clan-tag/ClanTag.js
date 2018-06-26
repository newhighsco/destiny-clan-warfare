import React, { PureComponent } from 'react'
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './ClanTag.styl'

const baseClassName = 'clan-tag'

const ClanTag = class extends PureComponent {
  render () {
    const { children, className, href } = this.props
    const classes = classNames(styles[baseClassName], className)
    const Element = href ? Link : 'span'

    return (
      <Element to={href} className={classes}>{children}</Element>
    )
  }
}

ClanTag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string
}

export default ClanTag
