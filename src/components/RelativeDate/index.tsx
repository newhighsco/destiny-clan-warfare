import React, { useEffect, useState } from 'react'
import { formatDateTime, utcDate } from '@helpers/time'

interface RelativeDateProps {
  date: string
  label: string
  className?: string
}

const RelativeDate: React.FC<RelativeDateProps> = ({
  date,
  label,
  className
}) => {
  const [enhanced, setEnhanced] = useState(false)

  useEffect(() => {
    setEnhanced(true)
  }, [])

  if (!date) return null

  const dateTime = utcDate(date)
  const currentDate = utcDate()
  const displayDate = enhanced
    ? dateTime.isAfter(currentDate)
      ? dateTime.toNow()
      : dateTime.fromNow()
    : formatDateTime(dateTime)

  return (
    <time dateTime={dateTime.toISOString()} className={className}>
      {[label, displayDate].filter(Boolean).join(' ')}
    </time>
  )
}

export default RelativeDate
