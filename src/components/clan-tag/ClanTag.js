import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SmartLink from '../smart-link/SmartLink'
import styles from './ClanTag.styl'

const baseClassName = 'clan-tag'

const ClanTag = class extends PureComponent {
  render() {
    const { children, className, href } = this.props
    const classes = classNames(styles[baseClassName], className)
    const Element = href ? SmartLink : 'span'

    return (
      <Element href={href} className={classes}>
        {children}
      </Element>
    )
  }
}

ClanTag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string
}

export default ClanTag
