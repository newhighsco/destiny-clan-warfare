import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './List.styl'

const baseClassName = 'list'

const List = class extends PureComponent {
  render() {
    const {
      children,
      ordered,
      unstyled,
      inline,
      commaSeparated,
      className
    } = this.props

    if (!children) return null

    const Element = ordered ? 'ol' : 'ul'

    return (
      <Element
        className={classNames(
          styles[baseClassName],
          unstyled && styles[`${baseClassName}--unstyled`],
          inline && styles[`${baseClassName}--inline`],
          commaSeparated && styles[`${baseClassName}--comma-separated`],
          className
        )}
      >
        {children}
      </Element>
    )
  }
}

List.propTypes = {
  children: PropTypes.node,
  ordered: PropTypes.bool,
  unstyled: PropTypes.bool,
  inline: PropTypes.bool,
  commaSeparated: PropTypes.bool,
  className: PropTypes.string
}

export default List
