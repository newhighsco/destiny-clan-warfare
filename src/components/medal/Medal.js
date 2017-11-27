import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../icon/Icon'
import Tooltip from '../tooltip/Tooltip'
import HighlightSvg from './highlight.svg'
import Tier1Svg from './background/tier1.svg'
import Tier2Svg from './background/tier2.svg'
import Tier3Svg from './background/tier3.svg'
import HeraldOfWarSvg from './foreground/herald-of-war.svg'

import './Medal.styl'

const uppercamelcase = require('uppercamelcase')

const baseClassName = 'medal'
const BackgroundSvgs = {
  Tier1: Tier1Svg,
  Tier2: Tier2Svg,
  Tier3: Tier3Svg
}
const ForegroundSvgs = {
  HeraldOfWar: HeraldOfWarSvg
}

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
