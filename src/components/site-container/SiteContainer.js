import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './SiteContainer.styl'

const baseClassName = 'site-container'

const SiteContainer = class extends PureComponent {
  render() {
    const { children, element, ...rest } = this.props

    if (!children) return null

    const Element = element

    return (
      <Element className={classNames(styles[baseClassName])} {...rest}>
        {children}
      </Element>
    )
  }
}

SiteContainer.defaultProps = {
  element: 'div'
}

SiteContainer.propTypes = {
  children: PropTypes.node,
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

export default SiteContainer
