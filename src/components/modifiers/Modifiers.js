import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Modifiers.styl'

const Modifiers = ({ data, size }) => {
  const baseClassName = 'modifiers'

  if (!data || data.length <= 0) return (null)

  return (
    <ul className={classNames('list--inline', baseClassName, size && `${baseClassName}--${size}`)}>
      {data.map(modifier => (
        <li key={modifier.id} className="modifiers__icon">
          <div className="modifiers__label">
            {modifier.scoringModifier ? (
              `+${modifier.scoringBonus}`
            ) : (
              `x${modifier.multiplierBonus}`
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

Modifiers.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.oneOf([ 'small' ])
}

export default Modifiers

export const componentFragment = graphql`
  fragment modifiersFragment on Event {
    modifiers {
      id
      name
      description
      scoringModifier
      scoringBonus
      multiplierModifier
      multiplierBonus
    }
  }
`
