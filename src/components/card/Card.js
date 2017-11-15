import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Card = ({ cutout, children, className }) => {
  const baseClassName = 'card'

  return (
    <div className={classNames(baseClassName, className, cutout && `${baseClassName}--cutout`)}>
      {children}
    </div>
  )
}

Card.defaultProps = {
  cutout: false
}

Card.propTypes = {
  cutout: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card
