import React from 'react'
import { Card, ContentContainer } from '@newhighsco/chipset'
import Lockup from '@components/Lockup'
import { EventKicker } from '@components/Event'
import Leaderboard from '@components/Leaderboard'
import config from '@config'
import { clanUrl, currentUrl, isCurrent } from '@helpers/urls'
import { Clan as ClanTypes, ClanLeaderboardRow } from '@libs/api/types'

import styles from './Clan.module.scss'
import Avatar from '@components/Avatar'

export const ClanMeta = {
  null: {
    url: clanUrl,
    kicker: 'Clans',
    description:
      'progress battling their way to the top of the Destiny 2 clan leaderboard'
  },
  Current: {
    url: currentUrl,
    kicker: EventKicker.Current,
    description: `clan standings in the current ${config.name} event`
  }
}

interface ClanProps extends ClanTypes {
  tense?: string
  leaderboard?: ClanLeaderboardRow[]
}

const Clan: React.FC<ClanProps> = ({
  id,
  tense = null,
  name,
  motto,
  avatar,
  leaderboard
}) => {
  const isCurrentEvent = isCurrent(tense)
  const { kicker, url } = ClanMeta[tense]

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
              id={id}
              {...avatar}
              align="center"
              outline
              className={styles.avatar}
            />
            <Lockup
              heading={name}
              kicker={motto}
              align="center"
              reverse
              highlight={!isCurrentEvent}
            />
          </>
        }
        // {!isCurrent && description && Join button && <MedalList />}
        // {isCurrent && <Stats />}
      />
      <Leaderboard
        rows={leaderboard}
        columns={['games', 'wins']}
        setHref={({ id: memberId }) => currentUrl(id, memberId)}
      />
      {/* isCurrent && <Leaderboard /> && link to "/clans/{id}" */}
      {/* !isCurrent && <PreviousLeaderboard /> && <OverallLeaderboard /> && link to "/current/id" */}
    </ContentContainer>
  )
}

export default Clan
