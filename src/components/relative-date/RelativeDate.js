import React from 'react'
import PropTypes from 'prop-types'

const moment = require('moment')

const RelativeDate = ({ date, label }) => {
  const value = moment.utc(date)
  const title = value.format('YYYY-MM-DD HH:mm [UTC]')
  const machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ')
  const humanReadable = [ label, label && ' ', value.fromNow() ]

  return (
    <time
      dateTime={machineReadable}
      title={title}
    >
      {humanReadable}
    </time>
  )
}

RelativeDate.propTypes = {
  date: PropTypes.date,
  label: PropTypes.string
}

export default RelativeDate
