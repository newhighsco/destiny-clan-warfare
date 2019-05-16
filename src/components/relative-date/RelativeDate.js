import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

const moment = require('moment')
const constants = require('../../utils/constants')

const RelativeDate = class extends PureComponent {
  constructor(props) {
    super(props)

    const { apiStatus, start, end } = this.props
    var { label } = this.props
    var value
    var updated

    if (apiStatus) updated = apiStatus.updatedDate

    const currentDate = moment.utc()
    const startDate = start ? moment.utc(start) : null
    const endDate = end ? moment.utc(end) : null
    const updatedDate = updated ? moment.utc(updated) : null

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

    const dateTime = value
      ? value.format(constants.format.machineReadable)
      : null
    const title = value ? value.format(constants.format.humanReadable) : null

    this.state = {
      active: false,
      value,
      dateTime,
      title,
      label
    }
  }

  componentDidMount() {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  render() {
    const { active, value, dateTime, title, label } = this.state
    const { apiStatus, className } = this.props

    if (!value) return null

    const contents = [label, label && ' ', active ? value.fromNow() : title]

    if (apiStatus) return <Fragment>{active ? contents : <br />}</Fragment>

    return (
      <time dateTime={dateTime} title={title} className={className}>
        {contents}
      </time>
    )
  }
}

RelativeDate.propTypes = {
  apiStatus: PropTypes.object,
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  className: PropTypes.string
}

export default RelativeDate
