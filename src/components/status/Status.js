import React, { useContext } from 'react'
import { AppContext } from '../../contexts/App'
import ContentContainer from '../content-container/ContentContainer'
import Notification from '../notification/Notification'
import styles from './Status.styl'

function Status() {
  const { isEnhanced, apiDisabled } = useContext(AppContext)

  if (!isEnhanced || !apiDisabled) return null

  return (
    <ContentContainer gutter className={styles.status}>
      <Notification state="error">
        The Bungie API is currently offline for maintenance.
      </Notification>
    </ContentContainer>
  )
}

export default Status
