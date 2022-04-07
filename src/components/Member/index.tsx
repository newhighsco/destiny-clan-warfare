import React from 'react'
import { Card, ContentContainer } from '@newhighsco/chipset'
import Lockup from '@components/Lockup'
import { EventKicker } from '@components/Event'
import Leaderboard from '@components/Leaderboard'
import Avatar from '@components/Avatar'
import Notification from '@components/Notification'
import config from '@config'
import { clanUrl, currentUrl, isCurrent } from '@helpers/urls'
import {
  Clan,
  Member as MemberType,
  MemberLeaderboardRow
} from '@libs/api/types'

import styles from './Member.module.scss'

export const MemberMeta = {
  null: {
    url: clanUrl,
    kicker: 'Members',
    description: 'progress in the war against other clans in Destiny 2'
  },
  Current: {
    url: currentUrl,
    kicker: EventKicker.Current,
    description: `stats and match history in the current ${config.name} event`
  }
}

interface MemberProps extends Omit<MemberType, 'clanId'> {
  tense?: string
  clan?: Clan
  leaderboard?: MemberLeaderboardRow[]
}

const Member: React.FC<MemberProps> = ({
  tense,
  name,
  avatar,
  clan,
  leaderboard
}) => {
  const isCurrentEvent = isCurrent(tense)
  const { kicker, url } = MemberMeta[tense]

  return (
    <ContentContainer theme={{ content: styles.content }} size="desktop">
      {isCurrentEvent && (
        <Lockup
          kicker={kicker}
          kickerAttributes={{ href: url() }}
          align="center"
          highlight
        />
      )}
      <Card
        heading={
          <>
            <Avatar
              src={avatar}
              align="center"
              outline
              className={styles.avatar}
            />
            <Lockup
              heading={name}
              kicker={clan.name}
              kickerAttributes={{ href: url(clan.id) }}
              align="center"
              reverse
              highlight={!isCurrentEvent}
            />
          </>
        }
      />
      {isCurrentEvent && !leaderboard.length && (
        <Notification>
          Match history is being calculated. Please check back later.
        </Notification>
      )}
      <Leaderboard rows={leaderboard} />
    </ContentContainer>
  )
}

export default Member
