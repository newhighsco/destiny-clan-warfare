import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

const moment = require('moment')
const constants = require('../../utils/constants')
const apiStatus = require('../../utils/api-status')

class RelativeDate extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  render () {
    const { status, start, end, className } = this.props
    var { label } = this.props
    const { active } = this.state
    var updated

    if (status) updated = apiStatus().updatedDate

    if (!updated && !start && !end) return null

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

    const title = value.format(constants.format.humanReadable)
    const machineReadable = value.format(constants.format.machineReadable)
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
  start: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  end: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  label: PropTypes.string,
  className: PropTypes.string
}

export default RelativeDate
