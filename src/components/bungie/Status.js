import React from 'react'
import PropTypes from 'prop-types'
import Notification from '../notification/Notification'

const constants = require('../../utils/constants')

const Status = ({ code }) => {
  if (code !== constants.bungie.disabledStatusCode) return null

  return (
    <div className="content-center content-gutter">
      <Notification state="error">
        The Bungie API is currently offline for maintenance.
      </Notification>
    </div>
  )
}

Status.propTypes = {
  code: PropTypes.number
}

export default Status
