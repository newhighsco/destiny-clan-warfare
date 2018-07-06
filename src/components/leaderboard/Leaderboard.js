import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import classNames from 'classnames'
import Avatar from '../avatar/Avatar'
import Icon from '../icon/Icon'
import { ModifierList } from '../modifier/Modifier'
import { Medal, MedalList } from '../medal/Medal'
import { TagList } from '../tag/Tag'
import ClanTag from '../clan-tag/ClanTag'
import { PlatformList } from '../platform/Platform'
import RelativeDate from '../relative-date/RelativeDate'
import ExternalSvg from '../../images/external.svg'
import styles from './Leaderboard.styl'

const sentenceCase = require('sentence-case')
const constants = require('../../utils/constants')
const statsHelper = require('../../utils/stats-helper')

const baseClassName = 'leaderboard'

class LeaderboardName extends PureComponent {
  render () {
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
        <RelativeDate className={styles[`${baseClassName}__stat-suffix`]} start={startDate} end={endDate} label={label} />
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

class Leaderboard extends PureComponent {
  constructor (props) {
    super(props)

    const { data } = this.props
    const bonusColumns = data.length ? (data[0].bonuses || []).reduce((result, { shortName }) => result.concat(shortName), []) : []

    this.state = {
      bonusColumns
    }
  }

  render () {
    const { data, cutout, columns, multiColumn, className, prefetch } = this.props
    const { bonusColumns } = this.state

    if (!data || data.length < 1) return null

    return (
      <div className={
        classNames(styles[baseClassName],
        cutout && styles[`${baseClassName}--cutout`],
        multiColumn && styles[`${baseClassName}--multi-column`],
        className
      )}>
        {data.map((item, i) => {
          return (
            <div key={i} id={item.id} className={styles[`${baseClassName}__row`]} data-result={item.game && item.game.result}>
              {item.name &&
                <div className={styles[`${baseClassName}__header`]}>
                  {item.avatar &&
                    <Avatar id={item.id || i} className={styles[`${baseClassName}__icon`]} {...item.avatar} />
                  }
                  <Fragment>
                    {item.medal &&
                      <Medal {...item.medal} size="small" align="left" className={styles[`${baseClassName}__medal`]} />
                    }
                    <PlatformList platforms={item.platforms} size="small" className={styles[`${baseClassName}__platforms`]} />
                    {item.path ? (
                      <Link
                        to={{ pathname: item.path }}
                        prefetch={prefetch}
                        className={classNames(styles[`${baseClassName}__name`], styles[`${baseClassName}__link`])}
                      >
                        <LeaderboardName {...item} />
                      </Link>
                    ) : (
                      <div className={classNames(styles[`${baseClassName}__name`], styles[`${baseClassName}__link`])}>
                        <LeaderboardName {...item} />
                      </div>
                    )}
                  </Fragment>
                </div>
              }
              <div className={classNames(styles[`${baseClassName}__body`])}>
                <div className={styles[`${baseClassName}__stats`]}>
                  {item.game &&
                    <Fragment>
                      <div className={classNames(styles[`${baseClassName}__stat`], styles[`${baseClassName}__stat--game`])}>
                        {item.game.isExternal ? (
                          <a href={item.game.path} target="_blank" rel="noopener noreferrer">
                            <span>{item.game.name}</span>
                            <Icon className={styles[`${baseClassName}__external`]} a11yText="View permalink">
                              <ExternalSvg />
                            </Icon>
                          </a>
                        ) : (
                          <Link to={item.game.path} className={styles[`${baseClassName}__link`]}>
                            <span>{item.game.name}</span>
                          </Link>
                        )}
                        <RelativeDate className={styles[`${baseClassName}__stat-suffix`]} start={item.game.startDate} end={item.game.endDate} label={item.game.label ? `${item.game.label} -` : null} />
                      </div>
                      {item.game.medals && item.game.medals.length > 0 &&
                        <div className={classNames(styles[`${baseClassName}__stat`], styles[`${baseClassName}__stat--medals`])}>
                          <MedalList size="x-small" align="left" medals={item.game.medals} />
                        </div>
                      }
                    </Fragment>
                  }
                  {item.modifiers && item.modifiers.length > 0 &&
                    <div className={classNames(styles[`${baseClassName}__stat`], styles[`${baseClassName}__stat--modifiers`])}>
                      <ModifierList size="small" align="right" modifiers={item.modifiers} />
                    </div>
                  }
                  {item.tag &&
                    <ClanTag className={styles[`${baseClassName}__clan-tag`]} href={item.path}>{item.tag}</ClanTag>
                  }
                  {item.division &&
                    <div className={classNames(styles[`${baseClassName}__stat`], styles[`${baseClassName}__stat--division`])} data-prefix="Division" data-exact={item.division.size}><span>{item.division.name}</span></div>
                  }
                  {columns && columns.map((column, i) => {
                    if (column === 'bonuses' && bonusColumns.length) {
                      return bonusColumns.map((shortName, i) => {
                        const bonusKey = shortName.toLowerCase()

                        if (columns.indexOf(bonusKey) !== -1) return null

                        var bonusValue = item.bonuses ? item.bonuses.find(bonus => bonus.shortName === shortName).count : -1
                        if (bonusValue < 0) bonusValue = constants.blank

                        return (
                          <div key={i} className={classNames(styles[`${baseClassName}__stat`], styles[`${baseClassName}__stat--${bonusKey}`])} data-prefix={shortName}>{bonusValue}</div>
                        )
                      })
                    }

                    if (column === 'rank' && typeof item.rank === 'boolean') item.rank = item.rank === true ? '' : -1

                    var value = item[column]

                    if (typeof value === 'undefined' || value === null) return null

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
                      <div key={i} className={classNames(styles[`${baseClassName}__stat`], styles[`${baseClassName}__stat--${column}`])} data-prefix={sentenceCase(column)} data-exact={exactValue}><span>{value}</span></div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

Leaderboard.propTypes = {
  data: PropTypes.array,
  cutout: PropTypes.bool,
  columns: PropTypes.array,
  multiColumn: PropTypes.bool,
  className: PropTypes.string,
  prefetch: PropTypes.bool
}

export default Leaderboard
