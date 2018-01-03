import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from '../tooltip/Tooltip'
import Icon from '../icon/Icon'
import IconSvgs from './icons'

import './Modifier.styl'

const pascalCase = require('pascal-case')
const constants = require('../../utils/constants')

const baseClassName = 'modifier'

const Modifier = ({ name, description, creator, scoringModifier, scoringBonus, multiplierBonus, size, align }) => {
  const iconKey = pascalCase(name || '')
  const IconSvg = IconSvgs.hasOwnProperty(iconKey) ? IconSvgs[iconKey] : null
  var bonus = scoringModifier ? scoringBonus : multiplierBonus
  var prefix = scoringModifier ? constants.prefix.positive : constants.prefix.multiply
  var suffix = ''

  if (bonus <= 0) prefix = ''
  if (!scoringModifier && bonus < 1) {
    prefix = ''
    bonus *= 100
    suffix = constants.prefix.percent
  }

  const label = `${prefix}${bonus}${suffix}`
  const tooltip = [ description ]

  if (creator && creator.name) tooltip.push(`<br />Created by: ${creator.name}`)

  return (
    <Tooltip heading={name} text={tooltip.join('')} align={align} enableHover>
      <div className={classNames(
        baseClassName,
        size && `${baseClassName}--${size}`
      )}>
        {IconSvg ? (
          <Icon className={`${baseClassName}__icon`} a11yText={label}>
            <IconSvg />
          </Icon>
        ) : (
          <div className={`${baseClassName}__label`}>
            {label}
          </div>
        )}
      </div>
    </Tooltip>
  )
}

Modifier.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  creator: PropTypes.object,
  scoringModifier: PropTypes.bool,
  scoringBonus: PropTypes.number,
  multiplierBonus: PropTypes.number,
  size: PropTypes.oneOf([ 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ])
}

const ModifierList = ({ modifiers, size, align }) => {
  if (!modifiers || modifiers.length < 1) return null

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`)}>
      {modifiers.map((modifier, i) => (
        <li key={i}>
          <Modifier {...modifier} size={size} align={align} />
        </li>
      ))}
    </ul>
  )
}

ModifierList.defaultProps = {
  align: 'center'
}

ModifierList.propTypes = {
  modifiers: PropTypes.array,
  size: PropTypes.oneOf([ 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ])
}

export {
  Modifier,
  ModifierList
}

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
      creator {
        name
      }
    }
  }
`
