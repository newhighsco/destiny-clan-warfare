import React from 'react'
import { storiesOf } from '@storybook/react'
import Notification from './Notification'

storiesOf('Notification', module)
  .add('Regular', () => <Notification>Regular notification</Notification>)
  .add('Warning', () => (
    <Notification state="warning">Warning notification</Notification>
  ))
  .add('Error', () => (
    <Notification state="error">Error notification</Notification>
  ))
  .add('Success', () => (
    <Notification state="success">Success notification</Notification>
  ))
  .add('Notice', () => (
    <Notification state="notice">Notice notification</Notification>
  ))
