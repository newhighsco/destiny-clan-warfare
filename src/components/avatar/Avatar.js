import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 }
}

const AvatarLayer = (layer) => {
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

  if (!navigator.onLine) return null

  return (
    <div className={classNames('avatar', className)} style={color && { backgroundColor: color }}>
      {icon &&
        <ResponsiveMedia className="avatar__layer" ratio="1:1">
          <img src={icon} alt="" />
        </ResponsiveMedia>
      }
      {background && AvatarLayer(background)}
      {foreground && AvatarLayer(foreground)}
    </div>
  )
}

Avatar.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  foreground: PropTypes.object,
  background: PropTypes.object,
  className: PropTypes.string
}

export default Avatar
