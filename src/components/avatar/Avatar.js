import React, { PureComponent } from 'react'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'
import styles from './Avatar.styl'

const hexHelper = require('./lib/hex-helper')
const constants = require('../../utils/constants')

const baseClassName = 'avatar'

const AvatarLayer = class extends PureComponent {
  render () {
    const { id, layer } = this.props

    if (!layer.color || !layer.icon) return null

    const hex = hexHelper.hexToRgb(layer.color)
    const r = hex.r / 255
    const g = hex.g / 255
    const b = hex.b / 255

    return (
      <LazyLoad height={96} once>
        <svg className={styles[`${baseClassName}__layer`]} viewBox="0 0 512 512">
          <filter id={id} x="0" y="0" width="100%" height="100%">
            <feColorMatrix values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`} />
          </filter>
          <image width="100%" height="100%" filter={`url(${constants.prefix.hash}${id})`} xlinkHref={layer.icon} />
        </svg>
      </LazyLoad>
    )
  }
}

AvatarLayer.propTypes = {
  id: PropTypes.string,
  layer: PropTypes.object
}

const Avatar = class extends PureComponent {
  render () {
    const { icon, color, foreground, background, className, id, children, cutout, outline } = this.props
    const classes = classNames(
      styles[baseClassName],
      children && styles[`${baseClassName}--inline`],
      cutout && styles[`${baseClassName}--cutout`],
      outline && styles[`${baseClassName}--outline`],
      className
    )

    return (
      <div className={classes} style={hexHelper.isHex(color) && { backgroundColor: color }}>
        {icon &&
          <ResponsiveMedia className={styles[`${baseClassName}__layer`]} ratio="1:1">
            <LazyLoad height={96} once>
              <img src={icon} alt="" />
            </LazyLoad>
          </ResponsiveMedia>
        }
        {background &&
          <AvatarLayer id={`${id}-bg`} layer={background} />
        }
        {foreground &&
          <AvatarLayer id={`${id}-fg`} layer={foreground} />
        }
        {children}
      </div>
    )
  }
}

Avatar.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  foreground: PropTypes.object,
  background: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  cutout: PropTypes.bool,
  outline: PropTypes.bool,
  children: PropTypes.node
}

export default Avatar
