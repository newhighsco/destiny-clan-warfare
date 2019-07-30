import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withIsEnhanced } from 'react-progressive-enhancement'
import { withAPIStatus } from '../../contexts/APIStatusContext'
import ContentContainer from '../content-container/ContentContainer'
import Notification from '../notification/Notification'
import styles from './Status.styl'

const Status = class extends PureComponent {
  render() {
    const { isEnhanced, apiDisabled } = this.props

    if (!isEnhanced || !apiDisabled) return null

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
  isEnhanced: PropTypes.bool,
  apiDisabled: PropTypes.bool
}

export default withIsEnhanced(withAPIStatus(Status))
