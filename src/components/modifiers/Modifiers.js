import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Modifiers.styl'

const Modifiers = ({ data, size }) => {
  const baseClassName = 'modifiers'

  if (!data || data.length <= 0) return (null)

  return (
    <ul className={classNames(baseClassName, 'list--inline', size && `${baseClassName}--${size}`)}>
      {data.map(modifier => (
        <li key={modifier.id} className="modifiers__icon">{modifier.name}</li>
      ))}
    </ul>
  )
}

Modifiers.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.oneOf([ 'small' ])
}

export default Modifiers
