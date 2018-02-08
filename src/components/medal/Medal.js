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

const baseClassName = 'medal'

const Medal = ({ name, description, label, tier, count, size, align, className }) => {
  const backgroundKey = `Tier${tier}`
  const foregroundKey = pascalCase(name || '')
  const BackgroundSvg = BackgroundSvgs.hasOwnProperty(backgroundKey) ? BackgroundSvgs[backgroundKey] : null
  const ForegroundSvg = ForegroundSvgs.hasOwnProperty(foregroundKey) ? ForegroundSvgs[foregroundKey] : null
  const tooltip = [ description, '' ]

  if (label && label.length > 1) tooltip.push(`<strong>Awarded to:</strong> ${label.sort().join(', ')}`)

  if (!BackgroundSvg) return null

  return (
    <Tooltip heading={name} text={tooltip.join('<br />')} className={className} align={align} enableHover>
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
        {label &&
          <div className={`${baseClassName}__label`} dangerouslySetInnerHTML={{ __html: label.sort().join(', ') }} />
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
  tier: 1
}

Medal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.array,
  tier: PropTypes.number,
  count: PropTypes.number,
  size: PropTypes.oneOf([ 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ]),
  className: PropTypes.string
}

const MedalList = ({ medals, size, align }) => {
  if (!medals || medals.length < 1) return null

  medals = MultiSort(medals, {
    tier: 'DESC',
    name: 'ASC',
    label: 'ASC'
  })

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`)}>
      {medals.map((medal, i) => (
        <li key={i}>
          <Medal {...medal} size={size} align={align} />
        </li>
      ))}
    </ul>
  )
}

MedalList.defaultProps = {
  align: 'center'
}

MedalList.propTypes = {
  medals: PropTypes.array,
  size: PropTypes.oneOf([ 'x-small', 'small' ]),
  align: PropTypes.oneOf([ 'left', 'right', 'center' ])
}

export {
  Medal,
  MedalList
}

export const componentFragment = graphql`
  fragment memberMedalsFragment on Member {
    medals {
      tier
      name
      description
      count
    }
  }

  fragment clanMedalsFragment on Clan {
    medals {
      tier
      name
      description
      count
    }
  }

  fragment eventMedalsFragment on Event {
    medals {
      clans {
        tier
        name
        description
        label
      }
    }
  }
`
