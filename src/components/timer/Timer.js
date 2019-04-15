import React, { PureComponent } from 'react'
import { OutboundLink } from 'react-ga-donottrack'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Stat } from '../stat/Stat'
import styles from './Timer.styl'

const moment = require('moment')
const constants = require('../../utils/constants')
const statsHelper = require('../../utils/stats-helper')
const baseClassName = 'timer'
const tickInterval = 1000

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

class Timer extends PureComponent {
  constructor (props) {
    super(props)

    var { active } = this.props
    const { start, end } = this.props
    const currentDate = moment.utc()
    const startDate = moment.utc(start)
    const endDate = moment.utc(end)
    var displayDate = endDate
    var showProgress = false
    var showRange = false
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

    const totalDuration = moment.duration(endDate.diff(startDate)).asMilliseconds()
    const passedDuration = moment.duration(currentDate.diff(startDate)).asMilliseconds()
    const remainingDuration = moment.duration(displayDate.diff(currentDate)).asMilliseconds()

    this.state = {
      active,
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
      interval: null
    }

    this.tick = this.tick.bind(this)
    this.untick = this.untick.bind(this)
  }

  componentDidMount () {
    const { active } = this.state

    if (active === undefined) {
      this.setState({
        active: true,
        interval: setInterval(this.tick, tickInterval)
      })
    }
  }

  componentWillUnmount () {
    this.untick()
  }

  tick () {
    var { remainingDuration, passedDuration, showProgress } = this.state

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
          label: [ constants.relativeDate.past ],
          active: false
        })
      } else {
        const { start, end } = this.props
        const currentDate = moment.utc()
        const startDate = moment.utc(start)
        const endDate = moment.utc(end)

        passedDuration = moment.duration(currentDate.diff(startDate)).asMilliseconds()
        remainingDuration = moment.duration(endDate.diff(currentDate)).asMilliseconds()

        this.setState({
          showProgress: true,
          label: [ constants.relativeDate.current ],
          remainingDuration,
          passedDuration
        })
      }
    }
  }

  untick () {
    const { interval } = this.state

    interval && clearInterval(interval)
  }

  render () {
    const { active, startDate, startHref, endDate, endHref, displayDate, showProgress, showRange, label, totalDuration, remainingDuration, passedDuration } = this.state

    if (active && label.length <= 1) label.push(constants.prefix.relative)

    const passedPercentage = active ? statsHelper.percentage(passedDuration, totalDuration, true, 2) : 0
    const stat = {
      stat: active ? countdown(remainingDuration) : displayDate.date,
      label: active ? (showRange ? null : displayDate.full) : displayDate.time
    }

    return (
      <div className={styles[baseClassName]}>
        <Stat label={label.join(' ')} stat={stat} className={styles[`${baseClassName}__stat`]} size="small" />
        {active && showRange &&
          <div className={classNames(styles[`${baseClassName}__range`], showProgress && styles[`${baseClassName}__range--active`])}>
            {showProgress &&
              <div className={styles[`${baseClassName}-progress`]} data-value={passedPercentage}>
                <div className={styles[`${baseClassName}-progress__value`]} style={{ width: `${passedPercentage}%` }} />
              </div>
            }
            <OutboundLink to={startHref} eventLabel={startHref} target="_blank" rel="noopener noreferrer" className={styles[`${baseClassName}__date`]} data-prefix={constants.relativeDate.currentStart}>
              {startDate}
            </OutboundLink>
            <OutboundLink to={endHref} eventLabel={endHref} target="_blank" rel="noopener noreferrer" className={styles[`${baseClassName}__date`]} data-prefix={constants.relativeDate.currentEnd}>
              {endDate}
            </OutboundLink>
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
