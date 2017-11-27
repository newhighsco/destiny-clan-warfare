import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import HighlightSvg from './highlight.svg'

import './Medal.styl'

const path = require('path')
const uppercamelcase = require('uppercamelcase')

const requireSvgs = (req) => {
  let svgs = {}

  req.keys().forEach(key => {
    const filename = uppercamelcase(path.basename(key, '.svg'))
    svgs[filename] = req(key)
  })

  return svgs
}

const reqBackgroundSvgs = require.context('./background', false, /\.svg$/)
const reqForegroundSvgs = require.context('./foreground', false, /\.svg$/)
const BackgroundSvgs = requireSvgs(reqBackgroundSvgs)
const ForegroundSvgs = requireSvgs(reqForegroundSvgs)
const baseClassName = 'medal'

const Medal = ({ name, description, tier }) => {
  const backgroundKey = `Tier${tier}`
  const foregroundKey = uppercamelcase(name || '')
  const BackgroundSvg = BackgroundSvgs.hasOwnProperty(backgroundKey) ? BackgroundSvgs[backgroundKey] : null
  const ForegroundSvg = ForegroundSvgs.hasOwnProperty(foregroundKey) ? ForegroundSvgs[foregroundKey] : null

  if (!BackgroundSvg) return null

  return (
    <Tooltip heading={name} text={description} enableHover>
      <Icon className={classNames(baseClassName, `${baseClassName}--tier-${tier}`)}>
        <BackgroundSvg />
        {ForegroundSvg &&
          <ForegroundSvg className={classNames(`${baseClassName}__layer`, 'foreground')} />
        }
        <HighlightSvg className={classNames(`${baseClassName}__layer`, `${baseClassName}__highlight`)} />
      </Icon>
    </Tooltip>
  )
}

Medal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  tier: PropTypes.number
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
