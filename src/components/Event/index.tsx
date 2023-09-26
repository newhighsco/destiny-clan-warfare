import { Button, Card, ContentContainer, Prose } from '@newhighsco/chipset'
import Link from 'next/link'
import React from 'react'

import Leaderboard from '~components/Leaderboard'
import Lockup from '~components/Lockup'
import { MedalList, type MedalProps } from '~components/Medal'
import { ModifierList } from '~components/Modifier'
import Notification from '~components/Notification'
import { StatList } from '~components/Stat'
import Timer from '~components/Timer'
import { isCurrentEvent } from '~helpers/events'
import { formatDescription } from '~helpers/grammar'
import { clanUrl, currentUrl, eventUrl } from '~helpers/urls'
import {
  type Event as EventType,
  type EventLeaderboardRow
} from '~libs/api/types'

import styles from './Event.module.scss'

export enum EventKicker {
  NotStarted = 'Upcoming event',
  Running = 'Current event',
  Ended = 'Past event',
  Calculating = Ended
}

enum StatListKicker {
  Running = 'Top stats',
  Ended = 'Overall stats',
  Calculating = Ended
}

enum SummaryCallToAction {
  Running = 'View full leaderboard',
  Ended = 'View full result',
  Calculating = Ended
}

enum LeaderboardNotification {
  Running = 'Leaderboards for this event are being calculated.',
  Ended = 'Results for this event are being calculated.',
  Calculating = Ended
}

enum StatsListNotification {
  Running = 'Top stats for this event are being calculated.'
}

const StatListTooltip = {
  Running: (threshold: number) =>
    threshold && `Play a minimum of ${threshold} games to be included.`
}

interface EventProps extends EventType {
  kicker?: string
  medals?: MedalProps[]
  summary?: boolean
  leaderboard?: EventLeaderboardRow[]
}

const Event: React.FC<EventProps> = ({
  id,
  status,
  kicker,
  name,
  description,
  startDate,
  endDate,
  modifiers,
  stats,
  statsGamesThreshold,
  medals,
  summary,
  leaderboard
}) => {
  if (!id) return null

  const href = eventUrl({ status, id })
  const summaryCallToAction = summary && SummaryCallToAction[status]
  const statsListNotification =
    !stats && !!leaderboard && StatsListNotification[status]
  const statsListTooltip = StatListTooltip[status]?.(statsGamesThreshold)
  const leaderboardNotification =
    !leaderboard && LeaderboardNotification[status]
  const isCurrent = isCurrentEvent(status)

  return (
    <ContentContainer theme={{ content: styles.content }}>
      <Lockup
        kicker={kicker || EventKicker[status]}
        kickerAttributes={summary && { as: 'h1' }}
        align="center"
        highlight
      />
      <Card
        heading={
          <Lockup
            heading={name}
            headingAttributes={summary && { as: 'h2', href }}
          />
        }
        align="center"
      >
        <Timer start={startDate} end={endDate} />
        <Prose html={formatDescription(description)} />
        <ModifierList modifiers={modifiers} tooltipProps={{ manual: false }} />
        {!summary && (
          <>
            {statsListNotification && (
              <Notification>
                {statsListNotification} {statsListTooltip}
              </Notification>
            )}
            <StatList
              kicker={StatListKicker[status]}
              tooltip={statsListTooltip}
              stats={stats}
            />
            <MedalList
              kicker="Medals awarded"
              medals={medals}
              tooltipProps={{ manual: false }}
            />
          </>
        )}
        {summaryCallToAction && (
          <Link href={href} passHref legacyBehavior prefetch={false}>
            <Button>{summaryCallToAction}</Button>
          </Link>
        )}
      </Card>
      {!summary && (
        <>
          {leaderboardNotification && (
            <Notification>
              {leaderboardNotification} Please check back later.
            </Notification>
          )}
          <Leaderboard
            rows={leaderboard}
            columns={['active', 'size', 'score']}
            setHref={({ id }) => (isCurrent ? currentUrl(id) : clanUrl(id))}
          />
          <Button.Group>
            <Link href={eventUrl()} passHref legacyBehavior prefetch={false}>
              <Button>View all events</Button>
            </Link>
          </Button.Group>
        </>
      )}
    </ContentContainer>
  )
}

export default Event
