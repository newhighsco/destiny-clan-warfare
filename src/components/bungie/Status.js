import React from 'react'
import PropTypes from 'prop-types'

import './Status.styl'

const constants = require('../../utils/constants')

const Status = ({ status }) => {
  if (status.code !== constants.bungie.disabledStatusCode) return null

  return (
    <div className="content-center content-gutter">
      <div className="bungie-status">
        The Bungie API is currently offline for maintenance.
      </div>
    </div>
  )
}

Status.propTypes = {
  status: PropTypes.object
}

export default Status
