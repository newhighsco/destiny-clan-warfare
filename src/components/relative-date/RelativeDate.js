import React, { Component } from 'react'
import PropTypes from 'prop-types'

const moment = require('moment')

class RelativeDate extends Component {
  constructor (props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  render () {
    const { hidden, date, label } = this.props
    const { active } = this.state
    const value = moment.utc(date)
    const title = value.format('YYYY-MM-DD HH:mm [UTC]')
    const machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ')
    const humanReadable = [ label, label && ' ', (active ? value.fromNow() : title) ]

    return (
      <time
        dateTime={machineReadable}
        title={title}
        className={hidden && 'is-vhidden'}
      >
        {humanReadable}
      </time>
    )
  }
}

RelativeDate.propTypes = {
  hidden: PropTypes.bool,
  date: PropTypes.string,
  label: PropTypes.string
}

export default RelativeDate
