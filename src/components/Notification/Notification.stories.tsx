import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Notification, { NotificationState } from '@components/Notification'

export default {
  title: 'Components/Notification',
  component: Notification
} as ComponentMeta<typeof Notification>

const Template: ComponentStory<typeof Notification> = args => (
  <Notification {...args} />
)

export const Source = Template.bind({})

Source.args = {
  children: 'Content'
}
Source.parameters = {
  chromatic: { disable: true }
}

export const Example = Template.bind({})

Example.args = {
  children: 'Content'
}
Example.storyName = ' '

export const WithWarning = Template.bind({})

WithWarning.args = {
  ...Example.args,
  state: NotificationState.Warning
}

export const WithError = Template.bind({})

WithError.args = {
  ...Example.args,
  state: NotificationState.Error
}

export const WithSuccess = Template.bind({})

WithSuccess.args = {
  ...Example.args,
  state: NotificationState.Success
}

export const WithNotice = Template.bind({})

WithNotice.args = {
  ...Example.args,
  state: NotificationState.Notice
}
