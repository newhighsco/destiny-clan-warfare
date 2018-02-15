import React, { Component } from 'react'
import Notification from '../notification/Notification'

const constants = require('../../utils/constants')
const bungie = require('../../utils/bungie-helper')
const httpExceptionHandler = require('../../utils/http-exception-handler')

class Status extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: false
    }
  }

  componentDidMount () {
    bungie(`/Destiny2/Manifest/`)
      .then(({ data }) => {
        this.setState({ active: data.ErrorCode === constants.bungie.disabledStatusCode })
      })
      .catch(err => httpExceptionHandler(err))
  }

  render () {
    const { active } = this.state

    if (!active) return null

    return (
      <div className="content-center content-gutter">
        <Notification state="error">
          The Bungie API is currently offline for maintenance.
        </Notification>
      </div>
    )
  }
}

export default Status
