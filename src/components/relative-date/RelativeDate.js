import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const moment = require('moment')
const constants = require('../../utils/constants')
const apiStatus = require('../../utils/api-status')

class RelativeDate extends Component {
  constructor (props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  render () {
    const { start, end, className, status } = this.props
    var { label, updated } = this.props
    const { active } = this.state

    if (status) updated = apiStatus().updatedDate

    const currentDate = moment.utc()
    const startDate = moment.utc(start)
    const endDate = moment.utc(end)
    const updatedDate = moment.utc(updated)

    var value

    if (updated) {
      value = updatedDate
      label = label || constants.relativeDate.updated
    } else if (startDate < currentDate && endDate > currentDate) {
      value = endDate
      label = label || constants.relativeDate.current
    } else if (startDate > currentDate) {
      value = startDate
      label = label || constants.relativeDate.future
    } else if (endDate < currentDate) {
      value = endDate
      label = label || constants.relativeDate.past
    }

    if (!value) return null

    const title = value.format('YYYY-MM-DD HH:mm [UTC]')
    const machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ')
    const humanReadable = [ label, label && ' ', (active ? value.fromNow() : title) ]

    if (status) return (<Fragment>{active ? humanReadable : <br />}</Fragment>)

    return (
      <time
        dateTime={machineReadable}
        title={title}
        className={className}
      >
        {humanReadable}
      </time>
    )
  }
}

RelativeDate.propTypes = {
  status: PropTypes.bool,
  start: PropTypes.string,
  end: PropTypes.string,
  updated: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
}

export default RelativeDate
