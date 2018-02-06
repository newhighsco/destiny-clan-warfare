import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Card from '../card/Card'

import './Stat.styl'

const sentenceCase = require('sentence-case')
const constants = require('../../utils/constants')
const kda = require('../../utils/kda')
const baseClassName = 'stat'

const Stat = ({ label, prefix, stat }) => {
  var value = stat
  var valueLabel

  if (typeof value === 'object') {
    valueLabel = value.label
    value = value.stat || constants.blank
  }

  return (
    <div className={`${baseClassName}`}>
      <div className={`${baseClassName}__label`}>
        {prefix &&
          <span>{prefix} </span>
        }
        {label}
      </div>
      <div className={`${baseClassName}__value`}>
        {value}
      </div>
      {valueLabel &&
        <div className={classNames(`${baseClassName}__label`, `${baseClassName}__label--simple`)}>
          {valueLabel}
        </div>
      }
    </div>
  )
}

Stat.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string,
  stat: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object ])
}

const StatList = ({ stats, top }) => {
  if (!stats || stats.length < 1) return null

  var keys = Object.keys(stats)
  var filteredKeys = [
    'id'
  ]
  const kdaKeys = [
    'kills',
    'deaths',
    'assists'
  ]
  const kdaKey = 'kda'
  const bonusesKey = 'bonuses'

  if (keys.filter(key => kdaKeys.indexOf(key) !== -1).length === kdaKeys.length) {
    const index = keys.indexOf(kdaKeys[0])

    keys.splice(index, kdaKeys.length, kdaKey)
    stats[kdaKey] = kda(stats)
  }

  const bonusesIndex = keys.indexOf(bonusesKey)
  if (bonusesIndex !== -1) {
    const bonusesKeys = stats[bonusesKey].map(bonus => {
      const key = bonus.shortName

      if (keys.indexOf(key.toLowerCase()) !== -1) return null
      stats[key] = bonus.count
      return key
    })

    keys.splice(bonusesIndex, 1, ...bonusesKeys)
  }

  keys = Array.from(new Set(keys)).reduce((filtered, key) => {
    if (filteredKeys.indexOf(key) === -1) {
      filtered.push(key)
    }

    return filtered
  }, [])

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`)}>
      {keys.map((key, i) => {
        const label = sentenceCase(key)
        const stat = stats[key] !== null ? stats[key] : constants.blank
        var prefix

        if (top) {
          prefix = constants.prefix.most

          if (key.match(/(kda|score)/)) {
            prefix = constants.prefix.highest
          }
        }

        return (
          <li key={i}>
            <Stat label={label} stat={stat} prefix={prefix} />
          </li>
        )
      })}
    </ul>
  )
}

StatList.propTypes = {
  stats: PropTypes.object,
  top: PropTypes.bool
}

const StatHistory = ({ events, cutout }) => {
  if (!events || events.length < 1) return null
  const className = `${baseClassName}-history`

  return (
    <div className={classNames(className, cutout && `${className}--cutout`)}>
      <div className="grid">
        {events.map((event, i) => {
          return (
            <div key={i} id={i} className="grid__item one-half">
              <Card className={`${className}__card`}>{i}</Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

StatHistory.propTypes = {
  events: PropTypes.array,
  cutout: PropTypes.bool
}

export {
  Stat,
  StatList,
  StatHistory
}
