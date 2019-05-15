import React, { PureComponent } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './TextAlign.styl'

const baseClassName = 'text'

class TextAlign extends PureComponent {
  getAlignment() {
    const { center, justify, left, right } = this.props

    if (center) return 'center'
    if (justify) return 'justify'
    if (left) return 'left'
    if (right) return 'right'
  }

  render() {
    const { children, className } = this.props

    if (!children) return null

    const alignment = this.getAlignment()
    const classes = classNames(
      alignment && styles[`${baseClassName}-${alignment}`],
      className
    )

    if (!classes) return children

    return <div className={classes}>{children}</div>
  }
}

TextAlign.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  justify: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  className: PropTypes.string
}

export default TextAlign
