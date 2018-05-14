import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Notification from '../notification/Notification'
import styles from './Status.styl'

const constants = require('../../utils/constants')
const bungie = require('../../utils/bungie-helper')

class Status extends PureComponent {
  constructor (props) {
    super(props)

    const { active } = this.props

    this.state = {
      active
    }
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) {
      bungie(`/Destiny2/Milestones/`)
        .then(({ data }) => {
          this.setState({ active: constants.bungie.disabledStatusCode.indexOf(data.ErrorCode) !== -1 })
        })
        .catch(err => console.log(err))
    }
  }

  render () {
    const { active } = this.state

    if (!active) return null

    return (
      <div className={classNames(styles.status, 'content-center content-gutter')}>
        <Notification state="error">
          The Bungie API is currently offline for maintenance.
        </Notification>
      </div>
    )
  }
}

Status.propTypes = {
  active: PropTypes.bool
}

export default Status
