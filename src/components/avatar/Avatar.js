import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'

import './Avatar.styl'

const uuidv4 = require('uuid/v4')
const uuidv5 = require('uuid/v5')
const hexToRgb = require('./lib/hex-to-rgb')
const constants = require('../../utils/constants')
const createContentDigest = require('../../utils/create-content-digest')
const online = require('../../utils/online')
const baseClassName = 'avatar'

const AvatarLayer = (layer) => {
  if (!layer.color || !layer.icon) return null

  const hex = hexToRgb(layer.color)
  const r = hex.r / 255
  const g = hex.g / 255
  const b = hex.b / 255
  const uuid = uuidv4()
  const contentDigest = createContentDigest(layer)
  const id = uuidv5(contentDigest, uuid)

  return (
    <svg className={`${baseClassName}__layer`} viewBox="0 0 512 512">
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feColorMatrix values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`} />
      </filter>
      <image width="100%" height="100%" filter={`url(${constants.prefix.hash}${id})`} xlinkHref={layer.icon} />
    </svg>
  )
}

const Avatar = (props) => {
  const { icon, color, foreground, background, className, children, cutout, outline } = props
  const classes = classNames(
    baseClassName,
    children && `${baseClassName}--inline`,
    cutout && `${baseClassName}--cutout`,
    outline && `${baseClassName}--outline`,
    className
  )

  if (!online) return null

  return (
    <div className={classes} style={color && { backgroundColor: color }}>
      {icon &&
        <ResponsiveMedia className={`${baseClassName}__layer`} ratio="1:1">
          <img src={icon} alt="" />
        </ResponsiveMedia>
      }
      {background && AvatarLayer(background)}
      {foreground && AvatarLayer(foreground)}
      {children}
    </div>
  )
}

Avatar.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  foreground: PropTypes.object,
  background: PropTypes.object,
  className: PropTypes.string,
  cutout: PropTypes.bool,
  outline: PropTypes.bool,
  children: PropTypes.node
}

export default Avatar
