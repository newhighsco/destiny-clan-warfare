import React from 'react'
import Link from 'next/link'
import { Dayjs } from 'dayjs'
import { Button, Card, ContentContainer, Prose } from '@newhighsco/chipset'
import { eventUrl } from '@helpers/urls'
import Lockup from '@components/Lockup'
import { MedalList, MedalProps } from '@components/Medal'
import { ModifierList, ModifierProps } from '@components/Modifier'
import { StatList, StatProps } from '@components/Stat'
import Timer from '@components/Timer'

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

const StatListTooltip = {
  Current: (threshold: number) =>
    threshold && `Play a minimum of ${threshold} games to be included.`
}

interface EventProps {
  id: number
  tense: string
  name: string
  description?: string
  startDate?: Dayjs
  endDate?: Dayjs
  modifiers?: Array<ModifierProps>
  stats?: Array<StatProps>
  statsGamesThreshold?: number
  medals?: Array<MedalProps>
  summary?: boolean
}

const Event: React.FC<EventProps> = ({
  id,
  tense,
  name,
  description,
  startDate,
  endDate,
  modifiers,
  stats,
  statsGamesThreshold,
  medals,
  summary
}) => {
  const href = eventUrl(id)

  return (
    <ContentContainer theme={{ content: styles.content }}>
      <Lockup
        kicker={EventKicker[tense]}
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
        {summary && (
          <Link href={href} passHref>
            <Button>View</Button>
          </Link>
        )}
      </Card>
      {!summary && (
        <Button.Group>
          <Link href={eventUrl()} passHref>
            <Button>View all events</Button>
          </Link>
        </Button.Group>
      )}
    </ContentContainer>
  )
}

export default Event
