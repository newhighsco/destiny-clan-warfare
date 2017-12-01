import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from '../tooltip/Tooltip'
import Icon from '../icon/Icon'

import './Modifier.styl'

const pascalCase = require('pascal-case')
const path = require('path')

const requireSvgs = (req) => {
  var svgs = {}

  req.keys().forEach(key => {
    const filename = pascalCase(path.basename(key, '.svg'))
    svgs[filename] = req(key)
  })

  return svgs
}

const reqIconSvgs = require.context('./icons', false, /\.svg$/)
const IconSvgs = requireSvgs(reqIconSvgs)
const baseClassName = 'modifier'

const Modifier = ({ name, description, scoringModifier, scoringBonus, multiplierBonus, size, align }) => {
  const iconKey = pascalCase(name || '')
  const IconSvg = IconSvgs.hasOwnProperty(iconKey) ? IconSvgs[iconKey] : null

  return (
    <Tooltip heading={name} text={description} align={align} enableHover>
      <div className={classNames(
        baseClassName,
        size && `${baseClassName}--${size}`
      )}>
        {IconSvg ? (
          <Icon className={`${baseClassName}__icon`} a11yText={name}>
            <IconSvg />
          </Icon>
        ) : (
          <div className={`${baseClassName}__label`}>
            {scoringModifier ? (
              `+${scoringBonus}`
            ) : (
              `x${multiplierBonus}`
            )}
          </div>
        )}
      </div>
    </Tooltip>
  )
}

Modifier.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
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
    }
  }
`
