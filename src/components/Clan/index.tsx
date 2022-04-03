import React from 'react'
import { Card, ContentContainer } from '@newhighsco/chipset'
import Lockup from '@components/Lockup'
import { EventKicker } from '@components/Event'
import { clanUrl, currentUrl, CURRENT_TENSE } from '@helpers/urls'

import styles from './Clan.module.scss'

export const ClanMeta = {
  null: { kicker: 'Clans', url: clanUrl },
  Current: { kicker: EventKicker.Current, url: currentUrl }
}

interface ClanProps {
  tense?: string
  name: string
  motto: string
}

const Clan: React.FC<ClanProps> = ({ tense, name, motto }) => {
  const isCurrent = tense === CURRENT_TENSE
  const { kicker, url } = ClanMeta[tense]

  return (
    <ContentContainer theme={{ content: styles.content }} size="desktop">
      {isCurrent && (
        <Lockup
          kicker={kicker}
          kickerAttributes={{ href: url() }}
          align="center"
          highlight
        />
      )}
      <Card
        heading={
          <Lockup
            heading={name}
            kicker={motto}
            align="center"
            reverse
            highlight={!isCurrent}
          />
        }
        // {!isCurrent && description && Join button && <MedalList />}
        // {isCurrent && <Stats />}
      />
      {/* isCurrent && <Leaderboard /> && link to "/clans/{id}" */}
      {/* !isCurrent && <PreviousLeaderboard /> && <OverallLeaderboard /> && link to "/current/id" */}
    </ContentContainer>
  )
}

export default Clan
