import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { firstBy } from 'thenby'
import Icon from '../icon/Icon'
import allowedPlatforms from './platforms'
import styles from './Platform.styl'

const paramCase = require('param-case')
const svgs = require.context('./icons', false, /\.svg$/)

const baseClassName = 'platform'

class Platform extends PureComponent {
  render() {
    const { platform, size } = this.props
    const { name } = allowedPlatforms.find(({ id }) => id === platform.id)

    const key = paramCase(name || '')
    const iconKey = `./${key}.svg`
    const IconSvg = svgs.keys().find(key => key === iconKey)
      ? svgs(iconKey).default
      : null

    if (!IconSvg) return null

    return (
      <div
        className={classNames(
          styles[baseClassName],
          size && styles[`${baseClassName}--${size}`]
        )}
      >
        <Icon a11yText={name} className={styles[`${baseClassName}__icon`]}>
          <IconSvg />
        </Icon>
      </div>
    )
  }
}

Platform.propTypes = {
  platform: PropTypes.object,
  size: PropTypes.oneOf(['small'])
}

class PlatformList extends PureComponent {
  render() {
    const { size, className } = this.props
    var { platforms } = this.props

    if (!platforms || platforms.length < 1) return null

    platforms = platforms
      .filter(platform => platform.percentage >= 10)
      .sort(
        firstBy('size', -1)
          .thenBy('active', -1)
          .thenBy('id')
      )

    if (!platforms || platforms.length < 1) return null

    return (
      <ul
        className={classNames(
          'list--inline',
          styles[`${baseClassName}-list`],
          className
        )}
      >
        {platforms.map((platform, i) => (
          <li key={i}>
            <Platform platform={platform} size={size} />
          </li>
        ))}
      </ul>
    )
  }
}

PlatformList.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.oneOf(['small']),
  className: PropTypes.string
}

export { Platform, PlatformList }
