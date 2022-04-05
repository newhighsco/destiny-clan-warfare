import React from 'react'
import Link from 'next/link'
import { Dayjs } from 'dayjs'
import { Button, Card, ContentContainer, Prose } from '@newhighsco/chipset'
import { currentUrl, eventUrl } from '@helpers/urls'
import Leaderboard from '@components/Leaderboard'
import Lockup from '@components/Lockup'
import { MedalList, MedalProps } from '@components/Medal'
import { ModifierList } from '@components/Modifier'
import { StatList, StatProps } from '@components/Stat'
import Timer from '@components/Timer'
import { EventLeaderboardRow, Modifier } from '@libs/api/types'

import styles from './Event.module.scss'

export enum EventKicker {
  Current = 'Current event',
  Past = 'Past event',
  Future = 'Upcoming event'
}

enum StatListKicker {
  Current = 'Top stats',
  Past = 'Overall stats'
}

enum SummaryCallToAction {
  Current = 'View full leaderboard',
  Past = 'View full result'
}

const StatListTooltip = {
  Current: (threshold: number) =>
    threshold && `Play a minimum of ${threshold} games to be included.`
}

interface EventProps {
  id: number
  tense: string
  kicker?: string
  name: string
  description?: string
  startDate?: Dayjs
  endDate?: Dayjs
  modifiers?: Modifier[]
  stats?: StatProps[]
  statsGamesThreshold?: number
  medals?: MedalProps[]
  summary?: boolean
  leaderboard?: EventLeaderboardRow[]
}

const Event: React.FC<EventProps> = ({
  id,
  tense,
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

  const href = eventUrl(tense, id)
  const summaryCallToAction = summary && SummaryCallToAction[tense]

  return (
    <ContentContainer
      theme={{ root: styles.root, content: styles.content }}
      size="desktop"
    >
      <Lockup
        kicker={kicker || EventKicker[tense]}
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
        <Prose html={description} />
        <ModifierList modifiers={modifiers} tooltipProps={{ manual: false }} />
        <StatList
          kicker={StatListKicker[tense]}
          tooltip={StatListTooltip[tense]?.(statsGamesThreshold)}
          stats={!summary && stats}
        />
        <MedalList medals={medals} tooltipProps={{ manual: false }} />
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
            setHref={({ id }) => currentUrl(id)}
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
