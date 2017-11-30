import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Stat.styl'

const sentenceCase = require('sentence-case')

const baseClassName = 'stat'

const Stat = ({ label, value }) => (
  <div className={`${baseClassName}`}>
    <div className={`${baseClassName}__label`}>
      {label}
    </div>
    <div className={`${baseClassName}__value`}>
      {value}
    </div>
  </div>
)

Stat.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

const StatList = ({ stats }) => {
  if (!stats) return null

  let keys = Object.keys(stats)
  const blackListedKeys = [
    'id'
  ]

  keys = keys.reduce((filtered, key) => {
    if (blackListedKeys.indexOf(key) === -1) {
      filtered.push(key)
    }

    return filtered
  }, [])

  return (
    <ul className={classNames('list--inline', `${baseClassName}-list`)}>
      {keys.map((key, i) => {
        const label = sentenceCase(key)
        const value = stats[key]

        return (
          <li key={i}>
            <Stat label={label} value={value} />
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
