import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { FixedSizeList as List } from 'react-window'
import { ContentContainer, SmartLink } from '@newhighsco/chipset'
import Avatar, { AvatarSize } from '@components/Avatar'
import { rankNumber, shortNumber } from '@helpers/stats'
import { ClanLeaderboardRow, EventLeaderboardRow } from '@libs/api/types'

import styles from './Leaderboard.module.scss'
import RelativeDate from '@components/RelativeDate'

interface LeaderProps {
  rows?: EventLeaderboardRow[] | ClanLeaderboardRow[]
  columns?: string[]
  setHref?: (row: EventLeaderboardRow | ClanLeaderboardRow) => string
}

const Leaderboard: React.FC<LeaderProps> = ({ rows, columns, setHref }) => {
  if (!rows || rows.length < 1) return null

  const height = 500

  return (
    <ContentContainer theme={{ root: styles.root }}>
      <List
        height={height}
        itemCount={rows.length}
        itemSize={75}
        onItemsRendered={props => {
          console.log(111, props)
        }}
        onScroll={props => console.log(222, props)}
        overscanCount={10}
        width="100%"
      >
        {({ index, style }) => {
          const row = rows[index]
          const { id, avatar, name, lastUpdated, rank, score } = row
          const avatarProps =
            typeof avatar === 'string' ? { src: avatar } : avatar
          const href = setHref?.(row)

          return (
            <div
              style={style}
              className={classNames(styles.row, index % 2 === 0 && styles.even)}
            >
              <Avatar
                size={AvatarSize.Medium}
                id={id}
                {...avatarProps}
                className={styles.avatar}
              />
              <div className={classNames(styles.column, styles.heading)}>
                {href ? (
                  <Link href={href} passHref prefetch={false}>
                    <SmartLink className={styles.link}>{name}</SmartLink>
                  </Link>
                ) : (
                  <span>{name}</span>
                )}
                <RelativeDate
                  date={lastUpdated}
                  label="Updated"
                  className={styles.date}
                />
              </div>
              <div className={styles.column} data-label="rank">
                {rankNumber(rank)}
              </div>
              {columns?.map(
                column =>
                  column in row && (
                    <div
                      key={column}
                      className={styles.column}
                      data-label={column}
                    >
                      {shortNumber(row[column])}
                    </div>
                  )
              )}
              <div className={styles.column} data-label="score">
                {shortNumber(score)}
              </div>
            </div>
          )
        }}
      </List>
    </ContentContainer>
  )
}

export default Leaderboard
