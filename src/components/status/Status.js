import React, { useContext } from 'react'
import { context as ProgressiveEnhancementContext } from 'react-progressive-enhancement'
import { APIStatusContext } from '../../contexts/APIStatusContext'
import ContentContainer from '../content-container/ContentContainer'
import Notification from '../notification/Notification'
import styles from './Status.styl'

function Status() {
  const { isEnhanced } = useContext(ProgressiveEnhancementContext)
  const { apiDisabled } = useContext(APIStatusContext)

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
