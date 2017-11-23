import React from 'react'
import PropTypes from 'prop-types'

const moment = require('moment')

const LastUpdated = ({ date }) => {
  return (
    <span>Updated {moment.utc(date).fromNow()}</span>
  )
}

LastUpdated.propTypes = {
  date: PropTypes.date
}

export default LastUpdated
