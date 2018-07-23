import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from '../tooltip/Tooltip'
import { Lockup } from '../lockup/Lockup'
import styles from './Stat.styl'

const sentenceCase = require('sentence-case')
const constants = require('../../utils/constants')
const statsHelper = require('../../utils/stats-helper')
const sentence = require('../../utils/grammar').sentence

const baseClassName = 'stat'

class Stat extends PureComponent {
  render () {
    const { label, prefix, stat, size, className } = this.props
    var value = stat
    var valueLabel

    if (typeof value === 'object') {
      valueLabel = value.label
      value = typeof value.stat !== 'undefined' ? value.stat : constants.blank
      if (value < 0) value = constants.blank
    }

    value = isNaN(value) ? `${value}` : statsHelper.shortNumber(value)

    if (valueLabel && typeof valueLabel === 'string') valueLabel = [ valueLabel ]
    const enableHover = valueLabel && valueLabel.length > 1

    return (
      <Tooltip text={enableHover ? `<strong>Tied between:</strong> ${sentence(valueLabel)}` : null} className={className} valign="bottom" enableHover={enableHover}>
        <div className={classNames(
          styles[baseClassName],
          size && styles[`${baseClassName}--${size}`]
        )}>
          <div className={styles[`${baseClassName}__label`]}>
            {prefix &&
              <span>{prefix} </span>
            }
            {label}
          </div>
          <div className={styles[`${baseClassName}__value`]}>
            {value}
          </div>
          {valueLabel &&
            <div
              className={classNames(styles[`${baseClassName}__label`], styles[`${baseClassName}__label--simple`])}
              dangerouslySetInnerHTML={{ __html: sentence(valueLabel) }}
            />
          }
        </div>
      </Tooltip>
    )
  }
}

Stat.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string,
  stat: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object ]),
  size: PropTypes.oneOf([ 'small' ]),
  className: PropTypes.string
}

class StatList extends PureComponent {
  render () {
    const { stats, columns, kicker, tooltip, top, size } = this.props

    if (!stats || Object.keys(stats).length < 1) return null

    return (
      <Fragment>
        {kicker &&
          <Tooltip text={tooltip} className={styles[`${baseClassName}-lockup`]} enableHover>
            <Lockup kicker={kicker} borderless />
          </Tooltip>
        }
        <ul className={classNames('list--inline', styles[`${baseClassName}-list`])}>
          {columns.map((column, i) => {
            var prefix

            if (top) {
              prefix = constants.prefix.most

              if (column.match(/(kd|kda|ppg|score)/)) {
                prefix = constants.prefix.highest
              }
            }

            if (column === 'bonuses' && stats.bonuses && stats.bonuses.length) {
              return stats.bonuses.map(({ shortName, count }, i) => {
                const bonusKey = shortName.toLowerCase()

                if (columns.indexOf(bonusKey) !== -1) return null

                var bonusStat = count
                if (bonusStat < 0) bonusStat = constants.blank

                return (
                  <li key={i}>
                    <Stat label={shortName} stat={bonusStat} prefix={prefix} size={size} />
                  </li>
                )
              })
            }

            const label = sentenceCase(column)
            var stat = stats[column]

            if (typeof stat === 'undefined' || stat === null) return null
            if (stat < 0) stat = constants.blank

            return (
              <li key={i}>
                <Stat label={label} stat={stat} prefix={prefix} size={size} />
              </li>
            )
          })}
        </ul>
      </Fragment>
    )
  }
}

StatList.defaultProps = {
  columns: [
    'games',
    'wins',
    'kd',
    'kda',
    'bonuses',
    'ppg',
    'score'
  ]
}

StatList.propTypes = {
  stats: PropTypes.object,
  columns: PropTypes.array,
  kicker: PropTypes.string,
  tooltip: PropTypes.string,
  top: PropTypes.bool,
  size: PropTypes.oneOf([ 'small' ])
}

export {
  Stat,
  StatList
}
