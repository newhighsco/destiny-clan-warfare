import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Prose.styl'

const baseClassName = 'prose'

const Prose = class extends PureComponent {
  render() {
    const { contained, children, className, html } = this.props

    return (
      <div
        className={classNames(
          styles[baseClassName],
          contained && styles[`${baseClassName}--contained`],
          className
        )}
        {...html && { dangerouslySetInnerHTML: { __html: html } }}
      >
        {children}
      </div>
    )
  }
}

Prose.propTypes = {
  contained: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  html: PropTypes.string
}

export default Prose
