import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from '../tooltip/Tooltip'
import Icon from '../icon/Icon'
import List from '../list/List'
import icons from './icons'
import styles from './Modifier.styl'

const paramCase = require('param-case')
const constants = require('../../utils/constants')
const svgs = require.context('./icons', false, /\.svg$/)
const baseClassName = 'modifier'

class Modifier extends PureComponent {
  render() {
    const {
      name,
      description,
      creator,
      scoringModifier,
      size,
      align,
      valign,
      enableHover,
      tooltipActive
    } = this.props
    var { bonus } = this.props
    var key = paramCase(name)
    const icon = icons[key]

    if (icon && icon.svg) key = icon.svg

    const iconKey = `./${key}.svg`
    const IconSvg = svgs.keys().find(key => key === iconKey)
      ? svgs(iconKey).default
      : null
    const designer = icon ? icon.designer : null
    var prefix = scoringModifier
      ? constants.prefix.positive
      : constants.prefix.multiply
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
    if (scoringModifier && bonus === 0) prefix = constants.prefix.positive

    if (constants.modifiers.tbc.indexOf(name) !== -1) {
      prefix = ''
      suffix = ''
      bonus = 'TBC'
    }

    if (constants.modifiers.notApplicable.indexOf(name) !== -1) {
      prefix = ''
      suffix = ''
      bonus = 'N/A'
    }

    const label = `${prefix}${bonus}${suffix}`
    const tooltip = []

    if (description) tooltip.push(description, '')
    if (creator) tooltip.push(`<strong>Creator:</strong> ${creator}`)
    if (designer) tooltip.push(`<strong>Icon:</strong> ${designer}`)

    return (
      <Tooltip
        heading={name}
        text={tooltip.join('<br />')}
        align={align}
        valign={valign}
        enableHover={enableHover}
        active={tooltipActive}
      >
        <div
          className={classNames(
            styles[baseClassName],
            size && styles[`${baseClassName}--${size}`]
          )}
          data-key={key}
        >
          <Icon className={styles[`${baseClassName}__icon`]}>
            {IconSvg && <IconSvg />}
            {bonus !== undefined && (
              <div className={styles[`${baseClassName}__label`]}>{label}</div>
            )}
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
  size: PropTypes.oneOf(['small']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  valign: PropTypes.oneOf(['top', 'bottom', 'middle']),
  enableHover: PropTypes.bool,
  tooltipActive: PropTypes.bool
}

class ModifierList extends PureComponent {
  render() {
    const {
      modifiers,
      size,
      align,
      valign,
      enableHover,
      tooltipActive
    } = this.props

    if (!modifiers || modifiers.length < 1) return null

    return (
      <List inline className={styles[`${baseClassName}-list`]}>
        {modifiers.map((modifier, i) => (
          <li key={i}>
            <Modifier
              {...modifier}
              size={size}
              align={align}
              valign={valign}
              enableHover={enableHover}
              tooltipActive={tooltipActive}
            />
          </li>
        ))}
      </List>
    )
  }
}

ModifierList.defaultProps = {
  align: 'center',
  valign: 'top',
  enableHover: true
}

ModifierList.propTypes = {
  modifiers: PropTypes.array,
  size: PropTypes.oneOf(['small']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  valign: PropTypes.oneOf(['top', 'bottom', 'middle']),
  enableHover: PropTypes.bool,
  tooltipActive: PropTypes.bool
}

export { Modifier, ModifierList }
