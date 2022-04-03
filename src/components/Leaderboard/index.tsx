import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { SmartLink } from '@newhighsco/chipset'
import { rankNumber, shortNumber } from '@helpers/stats'
import { currentUrl } from '@helpers/urls'

import styles from './Leaderboard.module.scss'

interface LeaderProps {
  data?: any[]
}

const Leaderboard: React.FC<LeaderProps> = ({ data }) => {
  if (!data || data?.length < 1) return null

  return (
    <div>
      {data.map(({ ClanId, Score, Rank }) => (
        <div key={ClanId} className={styles.row}>
          <div className={classNames(styles.cell, styles.heading)}>
            <Link href={currentUrl(ClanId.toString())} passHref>
              <SmartLink>{ClanId}</SmartLink>
            </Link>
          </div>
          <div className={styles.cell} data-label="Rank">
            {rankNumber(Rank)}
          </div>
          <div className={styles.cell} data-label="Score">
            {shortNumber(Score)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
