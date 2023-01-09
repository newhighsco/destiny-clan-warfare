import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import {
  VariableSizeList as List,
  ListChildComponentProps,
  ListOnScrollProps
} from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SmartLink } from '@newhighsco/chipset'
import Avatar, { AvatarSize } from '@components/Avatar'
import avatarSizes from '@components/Avatar/_sizes.module.scss'
import RelativeDate from '@components/RelativeDate'
import { decode } from '@helpers/html-entities'
import { rankNumber, shortNumber } from '@helpers/stats'
import {
  ClanLeaderboardRow,
  EventLeaderboardRow,
  EventsLeaderboardRow,
  MemberLeaderboardRow
} from '@libs/api/types'

import styles from './Leaderboard.module.scss'

interface LeaderboardProps {
  rows?:
    | EventsLeaderboardRow[]
    | EventLeaderboardRow[]
    | ClanLeaderboardRow[]
    | MemberLeaderboardRow[]
  columns?: string[]
  height?: number
  setHref?: (
    row:
      | EventsLeaderboardRow
      | EventLeaderboardRow
      | ClanLeaderboardRow
      | MemberLeaderboardRow
  ) => string
}

interface LeaderboardRowProps extends ListChildComponentProps {
  width: number
  columns: LeaderboardProps['columns']
  setHref?: LeaderboardProps['setHref']
}

const LeaderboardContext = createContext<
  Partial<{ setSize: (index: number, size: number) => void }>
>({})

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  data,
  index,
  style,
  width,
  columns,
  setHref
}) => {
  const { setSize } = useContext(LeaderboardContext)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (rowRef.current) {
      setSize?.(index, rowRef.current.getBoundingClientRect().height)
    }
  }, [index, setSize, width])

  const row = data[index]
  const {
    id = index,
    name: encodedName = id.toString(),
    lastUpdated,
    rank
  } = row
  const name = decode(encodedName)
  const avatar = 'avatar' in row && row.avatar
  const href = setHref?.(row)

  return (
    <div
      style={style}
      ref={rowRef}
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
      <div className={styles.headings}>
        <div className={styles.heading}>
          {href ? (
            <Link href={href} passHref legacyBehavior prefetch={false}>
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
      </div>
      <div className={styles.columns}>
        {rank && (
          <div className={styles.column} data-label="rank">
            {rankNumber(rank)}
          </div>
        )}
        {columns?.map(
          column =>
            column in row && (
              <div key={column} className={styles.column} data-label={column}>
                {shortNumber(row[column])}
              </div>
            )
        )}
      </div>
    </div>
  )
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  rows,
  columns,
  height = 500,
  setHref
}) => {
  const listRef = useRef<List>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [overflowTop, setOverflowTop] = useState(false)
  const [overflowBottom, setOverflowBottom] = useState(false)
  const sizeMap = useRef<Record<string, number>>({})

  const setSize = useCallback((index: number, size: number) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size }

      if (listRef.current) {
        listRef.current.resetAfterIndex(0)
      }
    }
  }, [])

  const getSize = useCallback(
    (index: number) => sizeMap.current[index] || parseInt(avatarSizes.medium),
    []
  )

  const calcEstimatedSize = useCallback(() => {
    const keys = Object.keys(sizeMap.current)
    const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0)

    return estimatedHeight / keys.length
  }, [])

  if (!rows?.length) return null

  const handleScroll = ({ scrollOffset }: ListOnScrollProps): void => {
    const { clientHeight } = innerRef.current
    const top = scrollOffset > 0
    const bottom = scrollOffset + height < clientHeight

    if (top !== overflowTop) setOverflowTop(top)
    if (bottom !== overflowBottom) setOverflowBottom(bottom)
  }

  return (
    <div
      data-overflow-top={overflowTop}
      data-overflow-bottom={overflowBottom}
      style={{ height }}
    >
      <LeaderboardContext.Provider value={{ setSize }}>
        <AutoSizer>
          {({ width }) => (
            <List
              ref={listRef}
              className={styles.wrapper}
              estimatedItemSize={calcEstimatedSize()}
              height={height}
              innerRef={innerRef}
              itemCount={rows.length}
              itemData={rows}
              itemSize={getSize}
              onScroll={handleScroll}
              overscanCount={10}
              width={width}
            >
              {({ ...props }) => (
                <LeaderboardRow
                  {...props}
                  width={width}
                  columns={columns}
                  setHref={setHref}
                />
              )}
            </List>
          )}
        </AutoSizer>
      </LeaderboardContext.Provider>
    </div>
  )
}

export default Leaderboard
