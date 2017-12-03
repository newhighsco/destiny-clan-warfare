import React, { Component } from 'react'
import classNames from 'classnames'

import './Enrollment.styl'

class Enrollment extends Component {
  constructor (props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  render () {
    const baseClassName = 'enrollment'

    return (
      <div id="enroll" className={classNames('temp', baseClassName)}>
        <p>Introduction/Search/Enrollment</p>
      </div>
    )
  }
}

export default Enrollment
