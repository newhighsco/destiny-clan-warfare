import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ContentContainer from '../content-container/ContentContainer'
import Notification from '../notification/Notification'
import styles from './Status.styl'

const axios = require('axios')
const bungieHelper = require('../../utils/bungie-helper')

const bungieApi = bungieHelper.api()

const Status = class extends PureComponent {
  constructor(props) {
    super(props)

    const { active } = this.props

    this.state = {
      active,
      source: axios.CancelToken.source()
    }
  }

  async componentDidMount() {
    var { active, source } = this.state

    if (!active) {
      await bungieApi(`/Destiny2/Milestones/`, {
        cancelToken: source.token
      })
        .then(({ data }) => {
          active = bungieHelper.disabled(data.ErrorCode)
          localStorage.setItem('apiDisabled', active)
          this.setState({ active })
        })
        .catch(() => {})
    }
  }

  componentWillUnmount() {
    var { source } = this.state

    source.cancel()
  }

  render() {
    const { active } = this.state

    if (!active) return null

    return (
      <ContentContainer gutter className={styles.status}>
        <Notification state="error">
          The Bungie API is currently offline for maintenance.
        </Notification>
      </ContentContainer>
    )
  }
}

Status.propTypes = {
  active: PropTypes.bool
}

export default Status
