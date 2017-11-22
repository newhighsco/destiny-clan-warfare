import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from '../tooltip/Tooltip'

import './Modifiers.styl'

const Modifiers = ({ data, size, align }) => {
  const baseClassName = 'modifiers'

  if (!data || data.length <= 0) return (null)

  return (
    <ul className={classNames('list--inline', baseClassName, size && `${baseClassName}--${size}`)}>
      {data.map(modifier => (
        <li key={modifier.id}>
          <Tooltip heading={modifier.name} text={modifier.description} align={align} enableHover>
            <div className="modifiers__icon">
              <div className="modifiers__label">
                {modifier.scoringModifier ? (
                  `+${modifier.scoringBonus}`
                ) : (
                  `x${modifier.multiplierBonus}`
                )}
              </div>
            </div>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}

Modifiers.defaultProps = {
  align: 'center'
}

Modifiers.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.oneOf([ 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ])
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
