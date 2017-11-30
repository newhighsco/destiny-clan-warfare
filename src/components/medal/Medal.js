import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'
import HighlightSvg from './highlight.svg'

import './Medal.styl'

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

const reqBackgroundSvgs = require.context('./background', false, /\.svg$/)
const reqForegroundSvgs = require.context('./foreground', false, /\.svg$/)
const BackgroundSvgs = requireSvgs(reqBackgroundSvgs)
const ForegroundSvgs = requireSvgs(reqForegroundSvgs)
const baseClassName = 'medal'

const Medal = ({ name, description, label, tier, count, size, className }) => {
  const backgroundKey = `Tier${tier}`
  const foregroundKey = pascalCase(name || '')
  const BackgroundSvg = BackgroundSvgs.hasOwnProperty(backgroundKey) ? BackgroundSvgs[backgroundKey] : null
  const ForegroundSvg = ForegroundSvgs.hasOwnProperty(foregroundKey) ? ForegroundSvgs[foregroundKey] : null

  if (!BackgroundSvg) return null

  return (
    <Tooltip heading={name} text={description} className={className} enableHover>
      <div className={classNames(
          baseClassName,
          `${baseClassName}--tier-${tier}`,
          size && `${baseClassName}--${size}`
        )}
      >
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
          <div className={`${baseClassName}__label`}>
            {label}
          </div>
        }
        {count > 0 &&
          <div className={classNames(`${baseClassName}__count`, 'foreground')}>
            <span className="background">{count}</span>
          </div>
        }
      </div>
    </Tooltip>
  )
}

Medal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  tier: PropTypes.number,
  count: PropTypes.number,
  size: PropTypes.oneOf([ 'small' ]),
  className: PropTypes.string
}

const MedalList = ({ medals }) => {
  if (!medals) return null

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`)}>
      {medals.map((medal, i) => (
        <li key={i}>
          <Medal {...medal} />
        </li>
      ))}
    </ul>
  )
}

MedalList.propTypes = {
  medals: PropTypes.array
}

export {
  Medal,
  MedalList
}
