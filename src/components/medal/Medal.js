import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MultiSort from 'multi-sort'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'
import BackgroundSvgs from './background'
import ForegroundSvgs from './foreground'
import HighlightSvg from './highlight.svg'

import './Medal.styl'

const pascalCase = require('pascal-case')
const sentence = require('../../utils/grammar').sentence

const baseClassName = 'medal'

const Medal = ({ name, description, label, tier, count, size, align, className, enableHover, tooltipActive }) => {
  const backgroundKey = `Tier${tier}`
  const foregroundKey = pascalCase(name || '')
  const BackgroundSvg = BackgroundSvgs.hasOwnProperty(backgroundKey) ? BackgroundSvgs[backgroundKey] : null
  const ForegroundSvg = ForegroundSvgs.hasOwnProperty(foregroundKey) ? ForegroundSvgs[foregroundKey] : null
  const tooltip = [ description, '' ]
  const labelSentence = sentence(label)

  if (label && label.length > 1) tooltip.push(`<strong>Awarded to:</strong> ${labelSentence}`)

  if (!BackgroundSvg) return null

  return (
    <Tooltip heading={name} text={tooltip.join('<br />')} className={className} align={align} enableHover={enableHover} isActive={tooltipActive}>
      <div className={classNames(
        baseClassName,
        `${baseClassName}--tier-${tier}`,
        size && `${baseClassName}--${size}`
      )}>
        <Icon className={`${baseClassName}__icon`}>
          <ResponsiveMedia ratio="124:129">
            <BackgroundSvg />
            {ForegroundSvg &&
              <ForegroundSvg className={classNames(`${baseClassName}__layer`, 'foreground')} />
            }
            <HighlightSvg className={classNames(`${baseClassName}__layer`, `${baseClassName}__highlight`)} />
          </ResponsiveMedia>
        </Icon>
        {labelSentence &&
          <div className={`${baseClassName}__label`} dangerouslySetInnerHTML={{ __html: labelSentence }} />
        }
        {count > 1 &&
          <div className={classNames(`${baseClassName}__count`, 'foreground')}>
            <span className="background">{count}</span>
          </div>
        }
      </div>
    </Tooltip>
  )
}

Medal.defaultProps = {
  tier: 1,
  enableHover: true
}

Medal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.array,
  tier: PropTypes.number,
  count: PropTypes.number,
  size: PropTypes.oneOf([ 'x-small', 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ]),
  className: PropTypes.string,
  enableHover: PropTypes.bool,
  tooltipActive: PropTypes.bool
}

const MedalList = ({ medals, size, align, center, enableHover, tooltipActive }) => {
  if (!medals || medals.length < 1) return null

  medals = MultiSort(medals, {
    tier: 'DESC',
    name: 'ASC',
    label: 'ASC'
  })

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`, center && 'text-center')}>
      {medals.map((medal, i) => (
        <li key={i}>
          <Medal {...medal} size={size} align={align} enableHover={enableHover} tooltipActive={tooltipActive} />
        </li>
      ))}
    </ul>
  )
}

MedalList.defaultProps = {
  align: 'center',
  enableHover: true
}

MedalList.propTypes = {
  medals: PropTypes.array,
  size: PropTypes.oneOf([ 'x-small', 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ]),
  center: PropTypes.bool,
  enableHover: PropTypes.bool,
  tooltipActive: PropTypes.bool
}

export {
  Medal,
  MedalList
}
