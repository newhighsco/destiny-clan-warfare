import { Status } from '~libs/api/types'

export const isCurrentEvent = (status: string): boolean =>
  status === Status[Status.Running]

export const isUpcomingEvent = (status: string): boolean =>
  status === Status[Status.NotStarted]
