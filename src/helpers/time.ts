import dayjs, { ConfigType, Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { percentage } from '@helpers/stats'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(isBetween)
dayjs.extend(duration)
dayjs.extend(relativeTime)

dayjs.tz.setDefault('UTC')

export const utcDate = (date?: ConfigType) => dayjs.tz(date)

export const localDate = (date?: ConfigType) => dayjs(date).local()

export const formatDate = (date: Dayjs) => {
  const now = date.isUTC ? utcDate() : localDate()
  const showYear = !date.isSame(now, 'y')

  return date.format(
    ['MMM\xa0DD', showYear && 'YYYY'].filter(Boolean).join(', ')
  )
}

export const formatTime = (date: Dayjs) => date.format('HH:mm\xa0z')

export const formatDateTime = (date: Dayjs) =>
  [formatDate(date), formatTime(date)].join(' ')

export const formatDuration = (milliseconds: number) => {
  const duration = dayjs.duration(milliseconds)
  const days = Math.floor(duration.asDays())

  if (days < 0 || days > 25) {
    return null
  } else if (days > 1) {
    return duration.humanize()
  } else {
    const hours = Math.floor(duration.asHours())

    return [
      hours > 0 && `${hours}h`,
      `${Math.max(0, duration.minutes())}m`,
      `${Math.max(0, duration.seconds())}s`
    ]
      .filter(Boolean)
      .join(' ')
  }
}

export const countdown = (
  date: Dayjs,
  start: Dayjs,
  end: Dayjs,
  now: Dayjs
) => {
  const total = dayjs.duration(end.diff(start)).asMilliseconds()
  const passed = dayjs.duration(now.diff(start)).asMilliseconds()
  const remaining = dayjs.duration(date.diff(now)).asMilliseconds()

  return [formatDuration(remaining), percentage(passed, total, 3, true)]
}
