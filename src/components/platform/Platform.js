import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../icon/Icon'
import BattlenetSvg from './icons/battlenet.svg'
import PlaystationSvg from './icons/playstation.svg'
import XboxSvg from './icons/xbox.svg'

import './Platform.styl'

const baseClassName = 'platform'

const Platform = ({ type }) => {
  var Svg
  var name

  switch (type) {
    case 1:
      Svg = XboxSvg
      name = 'Xbox Live'
      break
    case 2:
      Svg = PlaystationSvg
      name = 'PlayStation Network'
      break
    case 4:
      Svg = BattlenetSvg
      name = 'Battle.net'
      break
  }

  if (!Svg) return null

  return (
    <div className={baseClassName} data-type={name}>
      <Icon a11yText={name} className={`${baseClassName}__icon`}>
        <Svg />
      </Icon>
    </div>
  )
}

Platform.propTypes = {
  type: PropTypes.number
}

const PlatformList = ({ types, className }) => {
  if (!types || types.length < 1) return null

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`, className)}>
      {types.map((type, i) => (
        <li key={i}>
          <Platform type={type} />
        </li>
      ))}
    </ul>
  )
}

PlatformList.propTypes = {
  types: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string
}

export {
  Platform,
  PlatformList
}
