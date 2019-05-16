import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ResponsiveMedia from '../responsive-media/ResponsiveMedia'
import styles from './Avatar.styl'

const hexHelper = require('./lib/hex-helper')
const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const statsHelper = require('../../utils/stats-helper')

const baseClassName = 'avatar'

const AvatarLayer = class extends PureComponent {
  render() {
    const { id, color, icon } = this.props

    if (!color || !icon) return null

    const hex = hexHelper.hexToRgb(color)
    const r = statsHelper.round(hex.r / 255, 3)
    const g = statsHelper.round(hex.g / 255, 3)
    const b = statsHelper.round(hex.b / 255, 3)

    return (
      <svg className={styles[`${baseClassName}__layer`]} viewBox="0 0 512 512">
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feColorMatrix
            values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`}
          />
        </filter>
        <image
          width="100%"
          height="100%"
          filter={`url(${constants.prefix.hash}${id})`}
          xlinkHref={urlBuilder.avatarLayerUrl(icon)}
        />
      </svg>
    )
  }
}

AvatarLayer.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string
}

const Avatar = class extends PureComponent {
  render() {
    const {
      icon,
      color,
      foreground,
      background,
      className,
      id,
      children,
      size,
      cutout,
      outline
    } = this.props
    const classes = classNames(
      styles[baseClassName],
      children && styles[`${baseClassName}--inline`],
      size && styles[`${baseClassName}--${size}`],
      cutout && styles[`${baseClassName}--cutout`],
      outline && styles[`${baseClassName}--outline`],
      className
    )
    const hasLayers = background || foreground

    return (
      <div
        className={classes}
        style={hexHelper.isHex(color) && { backgroundColor: color }}
      >
        {hasLayers ? (
          <Fragment>
            {background && <AvatarLayer id={`${id}-bg`} {...background} />}
            {foreground && <AvatarLayer id={`${id}-fg`} {...foreground} />}
          </Fragment>
        ) : (
          children || (
            <ResponsiveMedia
              className={styles[`${baseClassName}__layer`]}
              ratio="1:1"
            >
              <img src={urlBuilder.avatarIconUrl(icon)} alt="" />
            </ResponsiveMedia>
          )
        )}
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(['small']),
  cutout: PropTypes.bool,
  outline: PropTypes.bool,
  children: PropTypes.node
}

export default Avatar
