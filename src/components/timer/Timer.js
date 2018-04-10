import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Stat } from '../stat/Stat'
import styles from './Timer.styl'

const moment = require('moment')
const constants = require('../../utils/constants')
const baseClassName = 'timer'

const countdown = duration => {
  const days = duration.days()
  const hours = duration.hours()
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  const countdown = []

  if (days > 0) {
    countdown.push(`${days} days`)
  } else {
    if (hours > 0) countdown.push(`0${hours}`.slice(-2))
    countdown.push(`0${Math.max(0, minutes)}`.slice(-2))
    countdown.push(`0${Math.max(0, seconds)}`.slice(-2))
  }

  return countdown.join(':')
}

class Timer extends Component {
  constructor (props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  render () {
    const { start, end } = this.props
    const { active } = this.state
    const currentDate = moment.utc()
    const startDate = moment.utc(start)
    const endDate = moment.utc(end)
    const totalDuration = moment.duration(endDate.diff(startDate))
    const passedDuration = moment.duration(currentDate.diff(startDate))
    const remainingDuration = moment.duration(endDate.diff(currentDate))
    const progress = active ? Math.round(passedDuration.asMilliseconds() / totalDuration.asMilliseconds() * 100) : 0
    var humanReadableDate = endDate
    var label
    var labelSuffix = ''

    if (startDate < currentDate && endDate > currentDate) {
      label = constants.relativeDate.current
      labelSuffix = ' in'
    } else if (startDate > currentDate) {
      label = constants.relativeDate.future
      labelSuffix = ' in'
      humanReadableDate = startDate
    } else if (endDate < currentDate) {
      label = constants.relativeDate.past
    }

    const stat = active ? countdown(remainingDuration) : humanReadableDate.format(constants.format.humanReadable).toUpperCase()

    return (
      <div className={styles[baseClassName]}>
        <Stat label={`${label}${active ? labelSuffix : ''}`} stat={stat} className={styles[`${baseClassName}__stat`]} size="small" />
        {active &&
          <Fragment>
            <div className={styles[`${baseClassName}__date`]} data-prefix={constants.relativeDate.future}>
              {startDate.format(constants.format.humanReadable)}
            </div>
            <div className={styles[`${baseClassName}-progress`]}>
              <span className={styles[`${baseClassName}-progress__value`]} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles[`${baseClassName}__date`]} data-prefix={constants.relativeDate.current}>
              {endDate.format(constants.format.humanReadable)}
            </div>
          </Fragment>
        }
      </div>
    )
  }
}

Timer.propTypes = {
  start: PropTypes.date,
  end: PropTypes.date
}

export default Timer
