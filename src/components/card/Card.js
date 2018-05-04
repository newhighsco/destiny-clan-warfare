import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Card.styl'

const Card = class extends PureComponent {
  render () {
    const { cutout, center, children, className } = this.props
    const baseClassName = 'card'
    const classes = classNames(
      styles[baseClassName],
      cutout && styles[`${baseClassName}--cutout`],
      center && 'text-center',
      className
    )

    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
}

Card.defaultProps = {
  cutout: false,
  center: false
}

Card.propTypes = {
  cutout: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card
