import React from 'react'
import Link from 'next/link'
import { Button, Card, ContentContainer, Prose } from '@newhighsco/chipset'
import { clanUrl, currentUrl, eventUrl } from '@helpers/urls'
import Leaderboard from '@components/Leaderboard'
import Lockup from '@components/Lockup'
import { MedalList, MedalProps } from '@components/Medal'
import { ModifierList } from '@components/Modifier'
import { StatList } from '@components/Stat'
import Timer from '@components/Timer'
import { formatDescription } from '@helpers/grammar'
import {
  Event as EventType,
  EventLeaderboardRow,
  Status
} from '@libs/api/types'

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

  const href = eventUrl(status, id)
  const summaryCallToAction = summary && SummaryCallToAction[status]
  const isCurrent = status === Status[Status.Running]

  return (
    <ContentContainer
      theme={{ root: styles.root, content: styles.content }}
      size="desktop"
    >
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
            align="center"
          />
        }
        align="center"
      >
        <Timer start={startDate} end={endDate} />
        <Prose html={formatDescription(description)} />
        <ModifierList modifiers={modifiers} tooltipProps={{ manual: false }} />
        {!summary && (
          <>
            <StatList
              kicker={StatListKicker[status]}
              tooltip={StatListTooltip[status]?.(statsGamesThreshold)}
              stats={!summary && stats}
            />
            <MedalList
              kicker="Medals awarded"
              medals={medals}
              tooltipProps={{ manual: false }}
            />
          </>
        )}
        {summaryCallToAction && (
          <Link href={href} passHref prefetch={false}>
            <Button>{summaryCallToAction}</Button>
          </Link>
        )}
      </Card>
      {!summary && (
        <>
          <Leaderboard
            rows={leaderboard}
            columns={['active', 'size']}
            setHref={({ id }) => (isCurrent ? currentUrl(id) : clanUrl(id))}
          />
          <Button.Group>
            <Link href={eventUrl()} passHref prefetch={false}>
              <Button>View all events</Button>
            </Link>
          </Button.Group>
        </>
      )}
    </ContentContainer>
  )
}

export default Event
