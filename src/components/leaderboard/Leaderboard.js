import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import {
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized/dist/commonjs/CellMeasurer'
import List from 'react-virtualized/dist/commonjs/List'
import classNames from 'classnames'
import Avatar from '../avatar/Avatar'
import { ModifierList } from '../modifier/Modifier'
import { Medal, MedalList } from '../medal/Medal'
import { TagList } from '../tag/Tag'
import { PlatformList } from '../platform/Platform'
import RelativeDate from '../relative-date/RelativeDate'
import { Filter } from '../filter/Filter'
import TextButton from '../text-button/TextButton'
import styles from './Leaderboard.styl'

const sentenceCase = require('sentence-case')
const constants = require('../../utils/constants')
const statsHelper = require('../../utils/stats-helper')
const urlBuilder = require('../../utils/url-builder')

const baseClassName = 'leaderboard'
const emptyCache = () =>
  new CellMeasurerCache({
    fixedWidth: true
  })

const LeaderboardName = class extends PureComponent {
  render() {
    const { name, updated, tags } = this.props
    var { startDate, endDate } = this.props
    var label

    if (updated) {
      startDate = updated
      endDate = startDate
      label = constants.relativeDate.updated
    }

    return (
      <Fragment>
        <span dangerouslySetInnerHTML={{ __html: name }} />
        <TagList tags={tags} className={styles[`${baseClassName}__tags`]} />
        <RelativeDate
          className={styles[`${baseClassName}__stat-suffix`]}
          start={startDate}
          end={endDate}
          label={label}
        />
      </Fragment>
    )
  }
}

LeaderboardName.propTypes = {
  name: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  updated: PropTypes.string,
  tags: PropTypes.array
}

const Leaderboard = class extends PureComponent {
  constructor(props) {
    super(props)

    const { data, activeIndex } = this.props
    const bonusColumns =
      data && data.length
        ? (data[0].bonuses || []).reduce(
            (result, { shortName }) => result.concat(shortName),
            []
          )
        : []
    const suggestions = data
      ? data.map(({ name, tag }, index) => ({
          id: index,
          name: `${name}${tag ? ` [${tag}]` : ''}`
        }))
      : []

    this.state = {
      active: false,
      activeIndex,
      cache: emptyCache(),
      bonusColumns,
      overflow: { top: false, bottom: false },
      suggestions
    }

    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    const { active } = this.state

    if (!active) {
      this.setState(
        {
          active: true
        },
        () => this.handleResize()
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { data, activeIndex } = this.props

    if (this.List) {
      this.List.measureAllRows()

      if (prevProps.data.length !== data.length) {
        this.handleResize()
        this.List.scrollToPosition(0)
      }

      if (prevProps.activeIndex !== activeIndex) {
        this.handleSearch({ id: activeIndex })
      }
    }
  }

  handleResize(e) {
    const { cache, activeIndex } = this.state

    if (cache._rowCount > 0) {
      this.setState(
        {
          cache: emptyCache()
        },
        () => {
          if (activeIndex) this.List.scrollToRow(activeIndex)

          this.handleScroll(this.List.Grid._scrollingContainer)
        }
      )
    }
  }

  handleScroll(e) {
    const { padding } = this.props
    const { clientHeight, scrollHeight, scrollTop } = e
    const scrollBottom = clientHeight + scrollTop
    const top = scrollTop > padding
    const bottom = scrollBottom < scrollHeight - padding

    this.setState({ overflow: { top, bottom } })
  }

  handleSearch(tag) {
    const id = tag.id

    this.List.scrollToRow(id)

    this.setState(
      {
        activeIndex: id
      },
      () => {
        this.List.scrollToRow(id)
      }
    )
  }

  render() {
    const {
      data,
      cutout,
      search,
      overall,
      placeholder,
      columns,
      extraColumns,
      medalsSize,
      className
    } = this.props
    var {
      active,
      activeIndex,
      cache,
      bonusColumns,
      overflow,
      suggestions
    } = this.state

    if (!data) return null

    const dataCount = data.length

    if (dataCount < 1) return null

    return (
      <div
        className={classNames(
          styles[baseClassName],
          cutout && styles[`${baseClassName}--cutout`],
          extraColumns && styles[`${baseClassName}--extra-columns`],
          !active && styles[`${baseClassName}--inactive`],
          active && styles[`${baseClassName}--active`],
          className
        )}
        data-overflow-top={overflow.top}
        data-overflow-bottom={overflow.bottom}
      >
        {active && search && (
          <Filter
            className={classNames(
              styles[`${baseClassName}__search`],
              cutout && styles[`${baseClassName}--cutout`]
            )}
            placeholder={placeholder}
            suggestions={suggestions}
            handleAddition={this.handleSearch}
          />
        )}
        <AutoSizer
          className={styles[`${baseClassName}__wrapper`]}
          disableHeight
          defaultWidth={300}
          onResize={this.handleResize}
        >
          {({ height, width }) => (
            <List
              ref={instance => (this.List = instance)}
              className={styles[`${baseClassName}__container`]}
              deferredMeasurementCache={cache}
              height={500}
              width={width}
              onScroll={this.handleScroll}
              scrollToAlignment="start"
              scrollToIndex={activeIndex || 0}
              rowCount={dataCount}
              rowHeight={cache.rowHeight}
              rowRenderer={({ index, isScrolling, key, parent, style }) => {
                const item = data[index]
                if (item.bonusColumns) bonusColumns = item.bonusColumns
                const hasModifiers = item.modifiers && item.modifiers.length > 0
                const hasBody = item.game || hasModifiers || columns
                const rank = index + 1

                return (
                  <CellMeasurer
                    cache={cache}
                    columnIndex={0}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                  >
                    <div
                      role="row"
                      style={style}
                      className={styles[`${baseClassName}__row-wrapper`]}
                      {...index === 0 && { 'data-first': true }}
                      {...rank === dataCount && { 'data-last': true }}
                    >
                      <div
                        role="cell"
                        id={item.id}
                        className={classNames(
                          styles[`${baseClassName}__row`],
                          item.promoted &&
                            styles[`${baseClassName}__row--promoted`]
                        )}
                        data-result={item.game && item.game.result}
                        data-rank={rank}
                        {...rank % 2 === 0 && { 'data-even': true }}
                        {...index === activeIndex && { 'data-active': true }}
                      >
                        {item.name && (
                          <div className={styles[`${baseClassName}__header`]}>
                            {item.avatar && (
                              <Avatar
                                size="small"
                                id={item.id || index}
                                className={styles[`${baseClassName}__icon`]}
                                {...item.avatar}
                              />
                            )}
                            <Fragment>
                              {item.medal && (
                                <Medal
                                  {...item.medal}
                                  size="small"
                                  align="left"
                                  valign="middle"
                                  className={styles[`${baseClassName}__medal`]}
                                />
                              )}
                              <PlatformList
                                platforms={item.platforms}
                                size="small"
                                className={
                                  styles[`${baseClassName}__platforms`]
                                }
                              />
                              {item.path ? (
                                <TextButton
                                  href={item.path}
                                  className={classNames(
                                    styles[`${baseClassName}__name`],
                                    styles[`${baseClassName}__link`]
                                  )}
                                >
                                  <LeaderboardName {...item} />
                                </TextButton>
                              ) : (
                                <div
                                  className={classNames(
                                    styles[`${baseClassName}__name`],
                                    styles[`${baseClassName}__link`]
                                  )}
                                >
                                  <LeaderboardName {...item} />
                                </div>
                              )}
                            </Fragment>
                          </div>
                        )}
                        {hasBody && (
                          <div
                            role="cell"
                            className={classNames(
                              styles[`${baseClassName}__body`]
                            )}
                          >
                            <div className={styles[`${baseClassName}__stats`]}>
                              {item.game && (
                                <Fragment>
                                  {item.game.name && (
                                    <div
                                      className={classNames(
                                        styles[`${baseClassName}__stat`],
                                        styles[`${baseClassName}__stat--game`]
                                      )}
                                    >
                                      <TextButton
                                        href={item.game.path}
                                        target={
                                          item.game.isExternal && '_blank'
                                        }
                                        className={
                                          !item.game.isExternal
                                            ? styles[`${baseClassName}__link`]
                                            : null
                                        }
                                      >
                                        <span>{item.game.name}</span>
                                      </TextButton>
                                      <RelativeDate
                                        className={
                                          styles[
                                            `${baseClassName}__stat-suffix`
                                          ]
                                        }
                                        start={item.game.startDate}
                                        end={item.game.endDate}
                                        label={
                                          item.game.label
                                            ? `${item.game.label} -`
                                            : null
                                        }
                                      />
                                      {item.game.description && (
                                        <div
                                          className={
                                            styles[
                                              `${baseClassName}__stat-suffix`
                                            ]
                                          }
                                        >
                                          {item.game.description}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  {item.game.medals &&
                                    item.game.medals.length > 0 && (
                                      <div
                                        className={classNames(
                                          styles[`${baseClassName}__stat`],
                                          styles[
                                            `${baseClassName}__stat--medals`
                                          ]
                                        )}
                                      >
                                        <MedalList
                                          size={medalsSize}
                                          align="left"
                                          valign="middle"
                                          medals={item.game.medals}
                                        />
                                      </div>
                                    )}
                                </Fragment>
                              )}
                              {hasModifiers && (
                                <div
                                  className={classNames(
                                    styles[`${baseClassName}__stat`],
                                    styles[`${baseClassName}__stat--modifiers`]
                                  )}
                                >
                                  <ModifierList
                                    size="small"
                                    align="right"
                                    valign="middle"
                                    modifiers={item.modifiers}
                                  />
                                </div>
                              )}
                              {item.division && (
                                <div
                                  className={classNames(
                                    styles[`${baseClassName}__stat`],
                                    styles[`${baseClassName}__stat--division`]
                                  )}
                                  data-prefix="Division"
                                  data-exact={item.division.size}
                                >
                                  <span>{item.division.name}</span>
                                </div>
                              )}
                              {columns &&
                                columns.map((column, i) => {
                                  if (
                                    column === 'bonuses' &&
                                    bonusColumns.length
                                  ) {
                                    return bonusColumns.map((shortName, i) => {
                                      const bonusKey = shortName.toLowerCase()

                                      if (columns.indexOf(bonusKey) !== -1)
                                        return null

                                      var bonusValue = item.bonuses
                                        ? item.bonuses.find(
                                            bonus =>
                                              bonus.shortName === shortName
                                          ).count
                                        : -1
                                      if (bonusValue < 0)
                                        bonusValue = constants.blank

                                      return (
                                        <div
                                          key={i}
                                          className={classNames(
                                            styles[`${baseClassName}__stat`],
                                            styles[
                                              `${baseClassName}__stat--${bonusKey}`
                                            ]
                                          )}
                                          data-prefix={shortName}
                                        >
                                          {bonusValue}
                                        </div>
                                      )
                                    })
                                  }

                                  if (
                                    column === 'rank' &&
                                    typeof item.rank === 'boolean'
                                  )
                                    item.rank =
                                      item.rank === true
                                        ? statsHelper.ranking(rank)
                                        : -1

                                  var value = item[column]
                                  var href

                                  if (!overall && column === 'overall')
                                    href = urlBuilder.leaderboardRootUrl

                                  if (
                                    typeof value === 'undefined' ||
                                    value === null
                                  )
                                    return null

                                  var exactValue

                                  if (isNaN(value)) {
                                    value = `${value}`
                                  } else {
                                    if (value < 0) value = constants.blank

                                    exactValue = value
                                    value = statsHelper.shortNumber(value)
                                    if (value === exactValue) exactValue = null
                                  }

                                  return (
                                    <div
                                      key={i}
                                      className={classNames(
                                        styles[`${baseClassName}__stat`],
                                        styles[
                                          `${baseClassName}__stat--${column}`
                                        ]
                                      )}
                                      data-prefix={sentenceCase(column)}
                                      data-exact={exactValue}
                                    >
                                      {href ? (
                                        <TextButton href={href}>
                                          {value}
                                        </TextButton>
                                      ) : (
                                        <span>{value}</span>
                                      )}
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CellMeasurer>
                )
              }}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}

Leaderboard.defaultProps = {
  medalsSize: 'x-small',
  padding: 10
}

Leaderboard.propTypes = {
  data: PropTypes.array,
  activeIndex: PropTypes.number,
  cutout: PropTypes.bool,
  search: PropTypes.bool,
  overall: PropTypes.bool,
  placeholder: PropTypes.string,
  columns: PropTypes.array,
  extraColumns: PropTypes.bool,
  medalsSize: PropTypes.oneOf(['x-small', 'small']),
  className: PropTypes.string,
  padding: PropTypes.number
}

export default Leaderboard
