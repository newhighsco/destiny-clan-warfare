import { Card, ContentContainer } from '@newhighsco/chipset'
import React from 'react'

import Avatar from '~components/Avatar'
import { EventKicker } from '~components/Event'
import Leaderboard from '~components/Leaderboard'
import Lockup from '~components/Lockup'
import Notification from '~components/Notification'
import config from '~config'
import { isCurrentEvent } from '~helpers/events'
import { clanUrl, currentUrl, pgcrUrl } from '~helpers/urls'
import {
  type Clan,
  type Member as MemberType,
  type MemberLeaderboardRow
} from '~libs/api/types'

import styles from './Member.module.scss'

export const MemberMeta = {
  null: {
    url: clanUrl,
    kicker: 'Members',
    description: 'progress in the war against other clans in Destiny 2'
  },
  Running: {
    url: currentUrl,
    kicker: EventKicker.Running,
    description: `stats and match history in the current ${config.name} event`
  }
}

interface MemberProps extends Omit<MemberType, 'clanId'> {
  status?: string
  clan?: Clan
  leaderboard?: MemberLeaderboardRow[]
}

const Member: React.FC<MemberProps> = ({
  status,
  name,
  avatar,
  clan,
  leaderboard
}) => {
  const isCurrent = isCurrentEvent(status)
  const { kicker, url } = MemberMeta[status]

  return (
    <ContentContainer theme={{ content: styles.content }}>
      {isCurrent && (
        <Lockup
          kicker={kicker}
          kickerAttributes={{ href: url() }}
          align="right"
          highlight
        />
      )}
      <Card
        heading={
          <>
            <Avatar src={avatar} outline className={styles.avatar} />
            <Lockup
              heading={name}
              kicker={clan.name}
              kickerAttributes={{ href: url(clan.id) }}
              reverse
              highlight={!isCurrent}
            />
          </>
        }
      />
      {isCurrent && !leaderboard.length && (
        <Notification>
          Match history is being calculated. Please check back later.
        </Notification>
      )}
      <Leaderboard
        rows={leaderboard}
        columns={['kills', 'assists', 'deaths']}
        setHref={({ id }) => pgcrUrl(id)}
      />
    </ContentContainer>
  )
}

export default Member
