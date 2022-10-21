import React, { createRef, memo, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import {
  areEqual,
  FixedSizeList as List,
  ListChildComponentProps,
  ListOnScrollProps
} from 'react-window'
import { ContentContainer, SmartLink } from '@newhighsco/chipset'
import Avatar, { AvatarSize } from '@components/Avatar'
import RelativeDate from '@components/RelativeDate'
import { rankNumber, shortNumber } from '@helpers/stats'
import {
  ClanLeaderboardRow,
  EventLeaderboardRow,
  MemberLeaderboardRow
} from '@libs/api/types'

import styles from './Leaderboard.module.scss'

interface LeaderboardProps {
  rows?: EventLeaderboardRow[] | ClanLeaderboardRow[] | MemberLeaderboardRow[]
  columns?: string[]
  setHref?: (
    row: EventLeaderboardRow | ClanLeaderboardRow | MemberLeaderboardRow
  ) => string
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  rows,
  columns,
  setHref
}) => {
  const innerRef = createRef<HTMLDivElement>()
  const [overflowTop, setOverflowTop] = useState(false)
  const [overflowBottom, setOverflowBottom] = useState(false)

  if (!rows || rows.length < 1) return null

  const height = 500

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const row = rows[index]
    const { id, name, lastUpdated, rank, score } = row
    const avatar = 'avatar' in row && row.avatar
    const href = setHref?.(row)

    return (
      <div
        style={style}
        className={classNames(styles.row, index % 2 === 0 && styles.even)}
      >
        {avatar && (
          <Avatar
            {...(typeof avatar === 'string' ? { src: avatar } : avatar)}
            size={AvatarSize.Medium}
            id={id}
            className={styles.avatar}
          />
        )}
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
              <div key={column} className={styles.column} data-label={column}>
                {shortNumber(row[column])}
              </div>
            )
        )}
        <div className={styles.column} data-label="score">
          {shortNumber(score)}
        </div>
      </div>
    )
  }

  const handleScroll = ({ scrollOffset }: ListOnScrollProps): void => {
    const { clientHeight } = innerRef.current
    const top = scrollOffset > 0
    const bottom = scrollOffset + height < clientHeight

    if (top !== overflowTop) setOverflowTop(top)
    if (bottom !== overflowBottom) setOverflowBottom(bottom)
  }

  return (
    <ContentContainer
      data-overflow-top={overflowTop}
      data-overflow-bottom={overflowBottom}
    >
      <List
        className={styles.wrapper}
        height={height}
        innerRef={innerRef}
        itemCount={rows.length}
        itemData={rows}
        itemSize={75}
        onScroll={handleScroll}
        overscanCount={10}
        width="100%"
      >
        {memo(Row, areEqual)}
      </List>
    </ContentContainer>
  )
}

export default Leaderboard
