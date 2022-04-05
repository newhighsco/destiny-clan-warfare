import React from 'react'
import { ContentContainer } from '@newhighsco/chipset'
import Lockup from '@components/Lockup'
import { EventKicker } from '@components/Event'
import config from '@config'
import { clanUrl, currentUrl, isCurrent } from '@helpers/urls'
import { Clan, Member as MemberType } from '@libs/api/types'

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
}

const Member: React.FC<MemberProps> = ({ tense, name, clan }) => {
  const isCurrentEvent = isCurrent(tense)
  const { kicker, url } = MemberMeta[tense]

  return (
    <ContentContainer theme={{ content: styles.content }}>
      {isCurrentEvent && (
        <Lockup
          kicker={kicker}
          kickerAttributes={{ href: url() }}
          align="center"
          highlight
        />
      )}
      <Lockup
        heading={name}
        kicker={clan.name}
        kickerAttributes={{ href: url(clan.id) }}
        align="center"
        reverse
        highlight={!isCurrentEvent}
      />
    </ContentContainer>
  )
}

export default Member
