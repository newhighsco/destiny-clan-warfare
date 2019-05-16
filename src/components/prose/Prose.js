import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Prose.styl'

const Prose = class extends PureComponent {
  render() {
    const { children, className, html } = this.props

    return (
      <div
        className={classNames(styles.prose, className)}
        {...html && { dangerouslySetInnerHTML: { __html: html } }}
      >
        {children}
      </div>
    )
  }
}

Prose.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  html: PropTypes.string
}

export default Prose
