import Notification, { NotificationState } from '.'

export default { component: Notification }

export const Source = {
  args: { children: 'Content' },
  parameters: { chromatic: { disable: true } }
}

export const Example = { args: Source.args, name: ' ' }

export const WithWarning = {
  args: { ...Example.args, state: NotificationState.Warning }
}

export const WithError = {
  args: { ...Example.args, state: NotificationState.Error }
}

export const WithSuccess = {
  args: { ...Example.args, state: NotificationState.Success }
}

export const WithNotice = {
  args: { ...Example.args, state: NotificationState.Notice }
}
