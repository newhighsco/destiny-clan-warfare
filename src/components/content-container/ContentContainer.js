import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './ContentContainer.styl'

const baseClassName = 'content-container'

const ContentContainer = class extends PureComponent {
  render() {
    const { children, gutter, className } = this.props

    if (!children) return null

    return (
      <div
        className={classNames(
          styles[baseClassName],
          gutter && styles[`${baseClassName}--gutter`],
          className
        )}
      >
        {children}
      </div>
    )
  }
}

ContentContainer.propTypes = {
  children: PropTypes.node,
  gutter: PropTypes.bool,
  className: PropTypes.string
}

export default ContentContainer
