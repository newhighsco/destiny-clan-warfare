import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MultiSort from 'multi-sort'
import Icon from '../icon/Icon'
import BattlenetSvg from './icons/battlenet.svg'
import PlaystationSvg from './icons/playstation.svg'
import XboxSvg from './icons/xbox.svg'

import './Platform.styl'

const baseClassName = 'platform'

const Platform = ({ platform, size }) => {
  var Svg
  var name

  switch (platform.id) {
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
    <div className={classNames(baseClassName, size && `${baseClassName}--${size}`)}>
      <Icon a11yText={name} className={`${baseClassName}__icon`}>
        <Svg />
      </Icon>
    </div>
  )
}

Platform.propTypes = {
  platform: PropTypes.number,
  size: PropTypes.oneOf([ 'small' ])
}

const PlatformList = ({ platforms, size, className }) => {
  if (!platforms || platforms.length < 1) return null

  platforms = MultiSort(platforms, {
    size: 'DESC',
    active: 'DESC',
    id: 'ASC'
  })

  const totalSize = platforms.map(platform => platform.size).reduce((a, b) => a + b, 0)

  platforms.map(platform => { platform.percentage = Math.round((platform.size / totalSize) * 100) })
  platforms = platforms.filter(platform => platform.percentage >= 10)

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`, className)}>
      {platforms.map((platform, i) => (
        <li key={i}>
          <Platform platform={platform} size={size} />
        </li>
      ))}
    </ul>
  )
}

PlatformList.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.oneOf([ 'small' ]),
  className: PropTypes.string
}

export {
  Platform,
  PlatformList
}
