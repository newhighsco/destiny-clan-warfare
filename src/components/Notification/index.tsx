import React from 'react'
import classNames from 'classnames'

import styles from './Notification.module.scss'

export enum NotificationState {
  Error = 'error',
  Notice = 'notice',
  Success = 'success',
  Warning = 'warning'
}

interface NotificationProps {
  state?: NotificationState
  id?: string
  html?: string
  children?: React.ReactNode
}

const Notification: React.FC<NotificationProps> = ({
  state,
  id,
  html,
  children
}) => {
  if (!children && !html) return null

  return (
    <div id={id} className={classNames(styles.root, state && styles[state])}>
      <div
        className={styles.content}
        {...(html && { dangerouslySetInnerHTML: { __html: html } })}
      >
        {children}
      </div>
    </div>
  )
}

export default Notification
