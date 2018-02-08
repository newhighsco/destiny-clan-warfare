import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Card.styl'

const Card = ({ cutout, center, children, className }) => {
  const baseClassName = 'card'
  const classes = classNames(
    baseClassName,
    className,
    cutout && `${baseClassName}--cutout`,
    center && 'text-center'
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
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
