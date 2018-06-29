import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

const moment = require('moment')
const constants = require('../../utils/constants')

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
    // TODO: Improve this no end
    const { apiStatus, start, end, className } = this.props
    var { label } = this.props
    const { active } = this.state
    var updated

    if (apiStatus) updated = apiStatus.updatedDate

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

    if (apiStatus) return (<Fragment>{active ? humanReadable : <br />}</Fragment>)

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
  apiStatus: PropTypes.object,
  start: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  end: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  label: PropTypes.string,
  className: PropTypes.string
}

export default RelativeDate
