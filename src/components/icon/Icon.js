import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden'
import styles from './Icon.styl'

const baseClassName = 'icon'

const Icon = class extends PureComponent {
  render() {
    const { children, a11yText, className, height, width } = this.props

    const iconClassNames = classNames(
      styles[baseClassName],
      (width || height) && styles[`${baseClassName}--custom-size`],
      className
    )

    return (
      <span
        className={iconClassNames}
        {...a11yText && {
          role: 'img',
          'aria-label': a11yText
        }}
        {...!a11yText && {
          'aria-hidden': 'true'
        }}
        style={{
          width: width && `${width}px`,
          height: height && `${height}px`,
          lineHeight: height && `${height}px`
        }}
      >
        {a11yText && <VisuallyHidden>{a11yText}</VisuallyHidden>}
        {children}
      </span>
    )
  }
}

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  a11yText: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
}

export default Icon
