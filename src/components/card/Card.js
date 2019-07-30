import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TextAlign from '../text-align/TextAlign'
import styles from './Card.styl'

const baseClassName = 'card'

const Card = class extends PureComponent {
  render() {
    const { cutout, center, promoted, children, className } = this.props

    if (!children) return null

    const classes = classNames(
      styles[baseClassName],
      cutout && styles[`${baseClassName}--cutout`],
      promoted && styles[`${baseClassName}--promoted`],
      className
    )

    return (
      <TextAlign center={center} className={classes}>
        {children}
      </TextAlign>
    )
  }
}

Card.propTypes = {
  cutout: PropTypes.bool,
  center: PropTypes.bool,
  promoted: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card
