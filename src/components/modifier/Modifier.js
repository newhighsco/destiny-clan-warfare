import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from '../tooltip/Tooltip'
import Icon from '../icon/Icon'
import Icons from './icons'
import styles from './Modifier.styl'

const pascalCase = require('pascal-case')
const constants = require('../../utils/constants')
const baseClassName = 'modifier'

class Modifier extends PureComponent {
  render () {
    const { name, description, creator, scoringModifier, size, align, enableHover, tooltipActive } = this.props
    var { bonus } = this.props
    const iconKey = pascalCase(name || '')
    const icon = Icons.hasOwnProperty(iconKey) ? Icons[iconKey] : null
    const IconSvg = icon ? icon.svg : null
    const designer = icon ? icon.designer : null
    var prefix = scoringModifier ? constants.prefix.positive : constants.prefix.multiply
    var suffix = ''

    if (bonus <= 0) prefix = ''
    if (!scoringModifier && bonus < 1) {
      suffix = constants.prefix.percent

      if (bonus === 0) {
        bonus = -100
      } else {
        prefix = ''
        bonus *= 100
      }
    }

    const label = `${prefix}${bonus}${suffix}`
    const tooltip = []

    if (description) tooltip.push(description, '')
    if (creator) tooltip.push(`<strong>Creator:</strong> ${creator}`)
    if (designer) tooltip.push(`<strong>Icon:</strong> ${designer}`)

    return (
      <Tooltip heading={name} text={tooltip.join('<br />')} align={align} enableHover={enableHover} active={tooltipActive}>
        <div
          className={classNames(
            styles[baseClassName],
            size && styles[`${baseClassName}--${size}`]
          )}
          data-key={iconKey}
        >
          <Icon className={styles[`${baseClassName}__icon`]}>
            {IconSvg &&
              <IconSvg />
            }
            {bonus &&
              <div className={styles[`${baseClassName}__label`]}>
                {label}
              </div>
            }
          </Icon>
        </div>
      </Tooltip>
    )
  }
}

Modifier.defaultProps = {
  enableHover: true
}

Modifier.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  creator: PropTypes.string,
  scoringModifier: PropTypes.bool,
  bonus: PropTypes.number,
  size: PropTypes.oneOf([ 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ]),
  enableHover: PropTypes.bool,
  tooltipActive: PropTypes.bool
}

class ModifierList extends PureComponent {
  render () {
    const { modifiers, size, align, enableHover, tooltipActive } = this.props

    if (!modifiers || modifiers.length < 1) return null

    return (
      <ul className={classNames('list--inline', styles[`${baseClassName}-list`])}>
        {modifiers.map((modifier, i) => (
          <li key={i}>
            <Modifier {...modifier} size={size} align={align} enableHover={enableHover} tooltipActive={tooltipActive} />
          </li>
        ))}
      </ul>
    )
  }
}

ModifierList.defaultProps = {
  align: 'center',
  enableHover: true
}

ModifierList.propTypes = {
  modifiers: PropTypes.array,
  size: PropTypes.oneOf([ 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ]),
  enableHover: PropTypes.bool,
  tooltipActive: PropTypes.bool
}

export {
  Modifier,
  ModifierList
}
