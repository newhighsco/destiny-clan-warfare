import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Stat.styl'

const sentenceCase = require('sentence-case')
const constants = require('../../utils/constants')
const kda = require('../../utils/kda')
const baseClassName = 'stat'

const Stat = ({ label, stat }) => {
  var value = stat
  var valueLabel

  if (typeof value === 'object') {
    valueLabel = value.label
    value = value.stat || constants.blank
  }

  return (
    <div className={`${baseClassName}`}>
      <div className={`${baseClassName}__label`}>
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
  stat: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object ])
}

const StatList = ({ stats }) => {
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

  if (keys.filter(key => kdaKeys.indexOf(key) !== -1).length === kdaKeys.length) {
    const index = keys.indexOf(kdaKeys[0])

    keys.splice(index, kdaKeys.length, kdaKey)
    stats[kdaKey] = kda(stats)
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

        return (
          <li key={i}>
            <Stat label={label} stat={stat} />
          </li>
        )
      })}
    </ul>
  )
}

StatList.propTypes = {
  stats: PropTypes.object
}

export {
  Stat,
  StatList
}
