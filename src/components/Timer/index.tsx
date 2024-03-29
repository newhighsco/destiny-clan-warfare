import { type Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'

import { Stat } from '~components/Stat'
import {
  countdown,
  formatDate,
  formatDateTime,
  formatTime,
  localDate,
  utcDate
} from '~helpers/time'
import useInterval from '~hooks/useInterval'

import styles from './Timer.module.scss'

enum TimerTense {
  Current = 'Ends',
  Future = 'Starts',
  Past = 'Ended'
}

interface TimerDateProps {
  label: string
  date: Dayjs
}

const TimerDate: React.FC<TimerDateProps> = ({ label, date }) => {
  return (
    <time
      data-label={label}
      className={styles.date}
      dateTime={date.toISOString()}
    >
      {formatDateTime(date)}
    </time>
  )
}

export interface TimerProps {
  start: string
  end: string
  tickInterval?: number
}

const Timer: React.FC<TimerProps> = ({ start, end, tickInterval = 1000 }) => {
  const [enhanced, setEnhanced] = useState(false)
  const [startDate, setStartDate] = useState(utcDate(start))
  const [endDate, setEndDate] = useState(utcDate(end))
  const [currentDate, setCurrentDate] = useState(utcDate())
  const tense = currentDate.isBetween(startDate, endDate, null, '[]')
    ? TimerTense.Current
    : startDate.isAfter(currentDate)
      ? TimerTense.Future
      : TimerTense.Past

  useEffect(() => {
    setEnhanced(true)
    setStartDate(localDate(startDate))
    setEndDate(localDate(endDate))
    setCurrentDate(localDate())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInterval(
    () => {
      setCurrentDate(localDate())
    },
    tense !== TimerTense.Past ? tickInterval : null
  )

  if (!start || !end) return null

  const displayDate = tense === TimerTense.Future ? startDate : endDate
  const [duration, progress] = enhanced
    ? countdown(displayDate, startDate, endDate, currentDate)
    : []
  const stat = {
    name: [tense, duration && 'in'].filter(Boolean).join(' '),
    value: duration || formatDate(displayDate),
    label: !duration && formatTime(displayDate)
  }

  return (
    <div className={styles.root}>
      <Stat {...stat} className={styles.stat} />
      {duration && (
        <div>
          {progress > 0 && (
            <progress max={100} value={progress} className={styles.progress} />
          )}
          <TimerDate label="Start" date={startDate} />
          <TimerDate label="End" date={endDate} />
        </div>
      )}
    </div>
  )
}

export default Timer
