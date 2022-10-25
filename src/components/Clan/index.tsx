import React from 'react'
import { Card, ContentContainer, Prose } from '@newhighsco/chipset'
import Lockup from '@components/Lockup'
import { EventKicker } from '@components/Event'
import Leaderboard from '@components/Leaderboard'
import Avatar from '@components/Avatar'
import { MedalProps } from '@components/Medal'
import { StatProps } from '@components/Stat'
import config from '@config'
import { formatDescription } from '@helpers/grammar'
import { clanUrl, currentUrl } from '@helpers/urls'
import { Clan as ClanTypes, ClanLeaderboardRow, Status } from '@libs/api/types'

import styles from './Clan.module.scss'

export const ClanMeta = {
  null: {
    url: clanUrl,
    kicker: 'Clans',
    description:
      'progress battling their way to the top of the Destiny 2 clan leaderboard'
  },
  Running: {
    url: currentUrl,
    kicker: EventKicker.Running,
    description: `clan standings in the current ${config.name} event`
  }
}

interface ClanProps extends ClanTypes {
  status?: string
  medals?: MedalProps[]
  stats?: StatProps[]
  leaderboard?: ClanLeaderboardRow[]
}

const Clan: React.FC<ClanProps> = ({
  id,
  status = null,
  name,
  motto,
  description,
  avatar,
  medals,
  stats,
  leaderboard
}) => {
  const isCurrent = status === Status[Status.Running]
  const { kicker, url } = ClanMeta[status]

  return (
    <ContentContainer theme={{ content: styles.content }}>
      {isCurrent && (
        <Lockup kicker={kicker} kickerAttributes={{ href: url() }} highlight />
      )}
      <Card
        heading={
          <>
            <Avatar {...avatar} id={id} outline className={styles.avatar} />
            <Lockup
              heading={name}
              kicker={motto}
              reverse
              highlight={!isCurrent}
            />
          </>
        }
      >
        <Prose html={formatDescription(description)} />
      </Card>
      {/* <StatList stats={stats} kicker="Top stats" /> */}
      {/* <MedalList kicker="Medals awarded" medals={medals} /> */}
      <Leaderboard
        rows={leaderboard}
        columns={['games', 'wins', 'kills', 'assists', 'deaths', 'score']}
        setHref={({ id: memberId }) => currentUrl(id, memberId)}
      />
      {/* isCurrent && <Leaderboard /> && link to "/clans/{id}" */}
      {/* !isCurrent && <PreviousLeaderboard /> && <OverallLeaderboard /> && link to "/current/id" */}
    </ContentContainer>
  )
}

export default Clan
