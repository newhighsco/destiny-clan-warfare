import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Notification from '../notification/Notification'
import styles from './Status.styl'

const bungieHelper = require('../../utils/bungie-helper')
const bungieProxy = bungieHelper.proxy()

class Status extends PureComponent {
  constructor (props) {
    super(props)

    const { active } = this.props

    this.state = {
      active
    }
  }

  componentDidMount () {
    var { active } = this.state

    if (!active) {
      bungieProxy(`/Destiny2/Milestones/`)
        .then(({ data }) => {
          active = bungieHelper.disabled(data.ErrorCode)
          localStorage.setItem('apiDisabled', active)
          this.setState({ active })
        })
    }
  }

  componentWillUnmount () {
    // TODO: Cancel API request
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
