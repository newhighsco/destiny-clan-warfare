import React from 'react'
import { storiesOf } from '@storybook/react'
import Notification from './Notification'

storiesOf('Components|Notification', module)
  .addParameters({ jest: 'Notification' })
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
