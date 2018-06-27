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

class Leaderboard extends PureComponent {
  render () {
    const { data, cutout, columns, multiColumn, className, prefetch } = this.props

    return (
      <div className={
        classNames(styles[baseClassName],
        cutout && styles[`${baseClassName}--cutout`],
        multiColumn && styles[`${baseClassName}--multi-column`],
        className
      )}>
        {data.map((item, i) => {
          const Name = () => {
            var startDate = item.startDate
            var endDate = item.endDate
            var label

            if (item.updated) {
              startDate = item.updated
              endDate = startDate
              label = constants.relativeDate.updated
            }

            return (
              <Fragment>
                <span dangerouslySetInnerHTML={{ __html: item.name }} />
                <TagList tags={item.tags} className={styles[`${baseClassName}__tags`]} />
                <RelativeDate className={styles[`${baseClassName}__stat-suffix`]} start={startDate} end={endDate} label={label} />
              </Fragment>
            )
          }

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
                        <Name />
                      </Link>
                    ) : (
                      <div className={classNames(styles[`${baseClassName}__name`], styles[`${baseClassName}__link`])}>
                        <Name />
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
                          <MedalList size="x-small" align="left" medals={item.medals} />
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
                    if (column === 'bonuses' && item.bonuses) {
                      return item.bonuses.map(({ shortName, count }, i) => {
                        const bonusKey = shortName.toLowerCase()

                        if (columns.indexOf(bonusKey) !== -1) return null

                        var bonusValue = count
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
