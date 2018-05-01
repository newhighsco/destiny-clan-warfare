import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Stat } from '../stat/Stat'
import styles from './Timer.styl'

const moment = require('moment')
const constants = require('../../utils/constants')
const statsHelper = require('../../utils/stats-helper')
const baseClassName = 'timer'

const countdown = duration => {
  const days = duration.days()
  const hours = Math.floor(duration.asHours())
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  const countdown = []

  if (days > 1) {
    countdown.push(`${days} day${days > 1 ? 's' : ''}`)
  } else {
    if (hours > 0) countdown.push(`${hours}h`)
    countdown.push(`${Math.max(0, minutes)}m`)
    countdown.push(`${Math.max(0, seconds)}s`)
  }

  return countdown.join(' ')
}

class Timer extends Component {
  constructor (props) {
    super(props)

    var { active } = this.props
    const { start, end } = this.props
    const currentDate = moment.utc()
    const startDate = moment.utc(start)
    const endDate = moment.utc(end)
    var showProgress = false
    var showRange = false
    var displayDate = endDate
    var label = []

    if (startDate < currentDate && endDate > currentDate) {
      showProgress = true
      showRange = true
      label.push(constants.relativeDate.current)
    } else if (startDate > currentDate) {
      showRange = true
      label.push(constants.relativeDate.future)
      displayDate = startDate
    } else if (endDate < currentDate) {
      label.push(constants.relativeDate.past)
      active = false
    }

    this.state = {
      active,
      currentDate,
      startDate,
      endDate,
      showProgress,
      showRange,
      displayDate,
      label,
      interval: null
    }

    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    const { active } = this.state

    if (active === undefined) {
      this.setState({
        active: true,
        interval: setInterval(this.tick, 1000)
      })
    }
  }

  componentWillUnmount () {
    const { interval } = this.state

    interval && clearInterval(interval)
  }

  tick () {
    this.setState({
      currentDate: moment.utc()
    })
  }

  render () {
    const { active, currentDate, startDate, endDate, showProgress, showRange, displayDate, label } = this.state

    if (active && label.length <= 1) label.push(constants.prefix.relative)

    const humanReadable = displayDate.format(constants.format.humanReadable)
    const humanReadableDate = displayDate.format(constants.format.humanReadableDate)
    const humanReadableTime = displayDate.format(constants.format.humanReadableTime)
    const totalDuration = moment.duration(endDate.diff(startDate))
    const passedDuration = moment.duration(currentDate.diff(startDate))
    const remainingDuration = moment.duration(displayDate.diff(currentDate))
    const passedPercentage = active ? statsHelper.percentage(passedDuration.asMilliseconds(), totalDuration.asMilliseconds(), true, 2) : 0
    const stat = {
      stat: active ? countdown(remainingDuration) : humanReadableDate,
      label: active ? (showRange ? null : humanReadable) : humanReadableTime
    }

    return (
      <div className={styles[baseClassName]}>
        <Stat label={label.join(' ')} stat={stat} className={styles[`${baseClassName}__stat`]} size="small" />
        {active && showRange &&
          <div className={classNames(styles[`${baseClassName}__progress`], showProgress && styles[`${baseClassName}__progress--active`])}>
            {showProgress &&
              <div className={styles[`${baseClassName}-progress`]} data-value={passedPercentage}>
                <div className={styles[`${baseClassName}-progress__value`]} style={{ width: `${passedPercentage}%` }} />
              </div>
            }
            <div className={styles[`${baseClassName}__date`]} data-prefix={constants.relativeDate.currentStart}>
              {startDate.format(constants.format.humanReadable)}
            </div>
            <div className={styles[`${baseClassName}__date`]} data-prefix={constants.relativeDate.currentEnd}>
              {endDate.format(constants.format.humanReadable)}
            </div>
          </div>
        }
      </div>
    )
  }
}

Timer.propTypes = {
  start: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  end: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  active: PropTypes.bool
}

export default Timer
