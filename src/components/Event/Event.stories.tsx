import {
  currentEvent,
  currentEventWithLeaderboard,
  currentEventWithStats,
  futureEvent,
  pastEvent,
  pastEventWithResults
} from '~fixtures/events'

import Event from '.'

export default { component: Event }

export const Source = { parameters: { chromatic: { disable: true } } }

export const Current = { args: { ...currentEvent } }

export const CurrentWithLeaderboard = {
  args: { ...currentEventWithLeaderboard }
}

export const CurrentWithStats = { args: { ...currentEventWithStats } }

export const CurrentWithSummary = {
  args: { ...CurrentWithStats.args, summary: true }
}

export const Future = { args: { ...futureEvent } }

export const FutureWithSummary = {
  args: { ...CurrentWithSummary.args, ...Future.args }
}

export const Past = { args: { ...pastEvent } }

export const PastWithResults = { args: { ...pastEventWithResults } }

export const PastWithSummary = {
  args: { ...CurrentWithSummary.args, ...Past.args }
}
