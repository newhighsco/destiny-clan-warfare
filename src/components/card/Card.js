import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Card = ({ children, className }) => (
  <div className={classNames('card', className)}>
    {children}
  </div>
)

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card
