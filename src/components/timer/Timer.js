import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withApp } from '../../contexts/App'
import { Stat } from '../stat/Stat'
import SmartLink from '../smart-link/SmartLink'
import styles from './Timer.styl'

const moment = require('moment')
const constants = require('../../utils/constants')
const statsHelper = require('../../utils/stats-helper')
const baseClassName = 'timer'

const countdown = milliseconds => {
  const duration = moment.duration(milliseconds)
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

const Timer = class extends PureComponent {
  constructor(props) {
    super(props)

    const { start, end, tickInterval } = this.props
    const currentDate = moment.utc()
    const startDate = moment.utc(start)
    const endDate = moment.utc(end)
    var displayDate = endDate
    var showProgress = false
    var showRange = false
    var label = []
    var disabled = false

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
      disabled = true
    }

    const totalDuration = moment
      .duration(endDate.diff(startDate))
      .asMilliseconds()
    const passedDuration = moment
      .duration(currentDate.diff(startDate))
      .asMilliseconds()
    const remainingDuration = moment
      .duration(displayDate.diff(currentDate))
      .asMilliseconds()

    this.state = {
      disabled,
      startDate: startDate.format(constants.format.humanReadable),
      startHref: startDate.format(constants.format.timeIs),
      endDate: endDate.format(constants.format.humanReadable),
      endHref: endDate.format(constants.format.timeIs),
      displayDate: {
        full: displayDate.format(constants.format.humanReadable),
        date: displayDate.format(constants.format.humanReadableDate),
        time: displayDate.format(constants.format.humanReadableTime)
      },
      showProgress,
      showRange,
      label,
      totalDuration,
      passedDuration,
      remainingDuration,
      tickInterval,
      interval: null
    }

    this.tick = this.tick.bind(this)
    this.untick = this.untick.bind(this)
  }

  componentDidMount() {
    const { disabled, tickInterval } = this.state

    if (!disabled) {
      this.setState({
        interval: setInterval(this.tick, tickInterval)
      })
    }
  }

  componentWillUnmount() {
    this.untick()
  }

  tick() {
    var {
      remainingDuration,
      passedDuration,
      showProgress,
      tickInterval
    } = this.state

    remainingDuration -= tickInterval
    passedDuration += tickInterval

    if (remainingDuration > 0) {
      this.setState({
        remainingDuration,
        passedDuration
      })
    } else {
      if (showProgress) {
        this.untick()

        this.setState({
          label: [constants.relativeDate.past],
          disabled: true
        })
      } else {
        const { start, end } = this.props
        const currentDate = moment.utc()
        const startDate = moment.utc(start)
        const endDate = moment.utc(end)

        passedDuration = moment
          .duration(currentDate.diff(startDate))
          .asMilliseconds()
        remainingDuration = moment
          .duration(endDate.diff(currentDate))
          .asMilliseconds()

        this.setState({
          showProgress: true,
          label: [constants.relativeDate.current],
          remainingDuration,
          passedDuration
        })
      }
    }
  }

  untick() {
    const { interval } = this.state

    interval && clearInterval(interval)
  }

  render() {
    var { isEnhanced } = this.props
    const {
      disabled,
      startDate,
      startHref,
      endDate,
      endHref,
      displayDate,
      showProgress,
      showRange,
      label,
      totalDuration,
      remainingDuration,
      passedDuration
    } = this.state

    if (disabled) isEnhanced = false

    if (isEnhanced && label.length <= 1) label.push(constants.prefix.relative)

    const passedPercentage = isEnhanced
      ? statsHelper.percentage(passedDuration, totalDuration, true, 2)
      : 0
    const stat = {
      stat: isEnhanced ? countdown(remainingDuration) : displayDate.date,
      label: isEnhanced
        ? showRange
          ? null
          : displayDate.full
        : displayDate.time
    }

    return (
      <div className={styles[baseClassName]}>
        <Stat
          label={label.join(' ')}
          stat={stat}
          className={styles[`${baseClassName}__stat`]}
          size="small"
        />
        {isEnhanced && showRange && (
          <div
            className={classNames(
              styles[`${baseClassName}__range`],
              showProgress && styles[`${baseClassName}__range--active`]
            )}
          >
            {showProgress && (
              <div
                className={styles[`${baseClassName}-progress`]}
                data-value={passedPercentage}
              >
                <div
                  className={styles[`${baseClassName}-progress__value`]}
                  style={{ width: `${passedPercentage}%` }}
                />
              </div>
            )}
            <SmartLink
              href={startHref}
              target="_blank"
              className={styles[`${baseClassName}__date`]}
              data-prefix={constants.relativeDate.currentStart}
            >
              {startDate}
            </SmartLink>
            <SmartLink
              href={endHref}
              target="_blank"
              className={styles[`${baseClassName}__date`]}
              data-prefix={constants.relativeDate.currentEnd}
            >
              {endDate}
            </SmartLink>
          </div>
        )}
      </div>
    )
  }
}

Timer.defaultProps = {
  tickInterval: 1000
}

Timer.propTypes = {
  isEnhanced: PropTypes.bool,
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tickInterval: PropTypes.number
}

export default withApp(Timer)
