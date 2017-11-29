import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Online } from 'react-detect-offline'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'

import './Avatar.styl'

const hexToRgb = require('./lib/hex-to-rgb')

const AvatarLayer = (layer) => {
  if (!layer.color || !layer.icon) return null

  const hex = hexToRgb(layer.color)
  const r = hex.r / 255
  const g = hex.g / 255
  const b = hex.b / 255

  return (
    <svg className="avatar__layer" viewBox="0 0 512 512">
      <filter id={layer.color} x="0" y="0" width="100%" height="100%">
        <feColorMatrix values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`} />
      </filter>
      <image width="100%" height="100%" filter={`url(#${layer.color})`} xlinkHref={layer.icon} />
    </svg>
  )
}

const Avatar = (props) => {
  const { icon, color, foreground, background, className } = props

  return (
    <Online>
      <div className={classNames('avatar', className)} style={{ backgroundColor: color }}>
        {icon &&
          <ResponsiveMedia className="avatar__layer" ratio="1:1">
            <img src={icon} alt="" />
          </ResponsiveMedia>
        }
        {background && AvatarLayer(background)}
        {foreground && AvatarLayer(foreground)}
      </div>
    </Online>
  )
}

Avatar.defaultProps = {
  color: '#000'
}

Avatar.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  foreground: PropTypes.object,
  background: PropTypes.object,
  className: PropTypes.string
}

export default Avatar
