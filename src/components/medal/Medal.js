import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MultiSort from 'multi-sort'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'
import { Lockup } from '../lockup/Lockup'
import BackgroundSvgs from './background'
import ForegroundSvgs from './foreground'
import HighlightSvg from './highlight.svg'
import styles from './Medal.styl'

const pascalCase = require('pascal-case')
const sentence = require('../../utils/grammar').sentence

const baseClassName = 'medal'

const Medal = ({ name, description, label, tier, count, size, align, className, enableHover, tooltipActive }) => {
  const backgroundKey = `Tier${tier}`
  const foregroundKey = pascalCase(name || '')
  const BackgroundSvg = BackgroundSvgs.hasOwnProperty(backgroundKey) ? BackgroundSvgs[backgroundKey] : null
  const foreground = ForegroundSvgs.hasOwnProperty(foregroundKey) ? ForegroundSvgs[foregroundKey] : null
  const ForegroundSvg = foreground ? foreground.svg : null
  const designer = foreground ? foreground.designer : null
  const tooltip = [ description, '' ]
  const labelSentence = sentence(label)

  if (designer) tooltip.push(`<strong>Icon:</strong> ${designer}`)
  if (label && label.length > 1) tooltip.push(`<strong>Awarded to:</strong> ${labelSentence}`)

  if (!BackgroundSvg) return null

  return (
    <Tooltip heading={name} text={tooltip.join('<br />')} className={className} align={align} enableHover={enableHover} active={tooltipActive}>
      <div
        className={classNames(
          styles[baseClassName],
          styles[`${baseClassName}--tier-${tier}`],
          size && styles[`${baseClassName}--${size}`]
        )}
        data-key={foregroundKey}
      >
        <Icon className={styles[`${baseClassName}__icon`]}>
          <ResponsiveMedia ratio="124:129">
            <BackgroundSvg />
            {ForegroundSvg &&
              <ForegroundSvg className={classNames(styles[`${baseClassName}__layer`], 'foreground')} />
            }
            <HighlightSvg className={classNames(styles[`${baseClassName}__layer`], styles[`${baseClassName}__highlight`])} />
          </ResponsiveMedia>
        </Icon>
        {labelSentence &&
          <div className={styles[`${baseClassName}__label`]} dangerouslySetInnerHTML={{ __html: labelSentence }} />
        }
        {count > 1 &&
          <div className={classNames(styles[`${baseClassName}__count`], 'foreground')}>
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

const MedalList = ({ medals, kicker, size, align, center, enableHover, tooltipActive }) => {
  if (!medals || medals.length < 1) return null

  medals = MultiSort(medals, {
    tier: 'DESC',
    name: 'ASC',
    label: 'ASC'
  })

  return (
    <Fragment>
      {kicker &&
        <Lockup kicker={kicker} className={styles[`${baseClassName}-lockup`]} borderless />
      }
      <ul className={classNames('list--inline', styles[`${baseClassName}-list`], center && 'text-center')}>
        {medals.map((medal, i) => (
          <li key={i}>
            <Medal {...medal} size={size} align={align} enableHover={enableHover} tooltipActive={tooltipActive} />
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

MedalList.defaultProps = {
  align: 'center',
  enableHover: true
}

MedalList.propTypes = {
  medals: PropTypes.array,
  kicker: PropTypes.string,
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
