import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import classNames from 'classnames'
import MultiSort from 'multi-sort'
import Avatar from '../avatar/Avatar'
import Icon from '../icon/Icon'
import { ModifierList } from '../modifier/Modifier'
import { Medal, MedalList } from '../medal/Medal'
import { TagList } from '../tag/Tag'
import ClanTag from '../clan-tag/ClanTag'
import { PlatformList } from '../platform/Platform'
import RelativeDate from '../relative-date/RelativeDate'
import ExternalSvg from '../../images/external.svg'

import './Leaderboard.styl'

const moment = require('moment')
const sentenceCase = require('sentence-case')
const constants = require('../../utils/constants')
const urlBuilder = require('../../utils/url-builder')
const statsHelper = require('../../utils/stats-helper')

class Leaderboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sorting: this.props.sorting
    }

    this.handleSort = this.handleSort.bind(this)
  }

  handleSort (e) {
    e.preventDefault()

    this.setState({
      sorting: e.target.dataset.sorting
    })
  }

  render () {
    var { data } = this.props
    const { columns, cutout, multiColumn, className, prefetch, stateKey } = this.props
    const { sorting } = this.state
    const baseClassName = 'leaderboard'

    if (!data || data.length <= 0) return null

    var keys = columns || Object.keys(data[0])
    const showIcons = (keys.indexOf('icon') !== -1 || keys.indexOf('foreground') !== -1 || keys.indexOf('background') !== -1)
    const showClanTag = keys.indexOf('clanTag') !== -1
    const showNames = keys.indexOf('name') !== -1
    const showNameTags = keys.indexOf('tags') !== -1
    const showGameDetails = keys.indexOf('game') !== -1
    const showModifiers = keys.indexOf('modifiers') !== -1
    const showMedal = keys.indexOf('medal') !== -1
    const showMedals = keys.indexOf('medals') !== -1
    const showBonuses = keys.indexOf('bonuses') !== -1
    const showPlatforms = keys.indexOf('platforms') !== -1
    const showUpdatedDate = keys.indexOf('updated') !== -1
    const filteredKeys = [
      'id',
      'icon',
      'color',
      'foreground',
      'background',
      'name',
      'clanId',
      'clanTag',
      'path',
      'game',
      'modifiers',
      'medal',
      'medals',
      'tags',
      'eventId',
      'platforms',
      'updated'
    ]

    if (stateKey) filteredKeys.push(stateKey)

    keys = keys.reduce((filtered, key) => {
      if (filteredKeys.indexOf(key) === -1) {
        filtered.push(key)
      }

      return filtered
    }, [])

    if (sorting) {
      data = MultiSort(data, sorting)
    }

    return (
      <div className={
        classNames(baseClassName,
        cutout && `${baseClassName}--cutout`,
        multiColumn && `${baseClassName}--multi-column`,
        className
      )}>
        {data.map((item, i) => {
          const rank = `${constants.prefix.hash}${i + 1}`
          var state = {}

          if (stateKey) {
            state[stateKey] = item[stateKey]
          }

          const Name = () => {
            const updatedDate = (showUpdatedDate && item.updated && moment(item.updated).isValid()) ? moment.utc(item.updated) : null

            return (
              <Fragment>
                <span dangerouslySetInnerHTML={{ __html: item.name }} />
                {showNameTags &&
                  <TagList tags={item.tags} className="leaderboard__tags" />
                }
                {showUpdatedDate &&
                  <RelativeDate className="leaderboard__stat-suffix" end={updatedDate} label={constants.relativeDate.updated} />
                }
              </Fragment>
            )
          }

          return (
            <div key={i} id={item.id} className="leaderboard__row" data-result={showGameDetails && item.game.result}>
              {(showIcons || showNames) &&
                <div className="leaderboard__header">
                  {showIcons &&
                    <Avatar className="leaderboard__icon" color={item.color} icon={item.icon} foreground={item.foreground} background={item.background} />
                  }
                  {showNames &&
                    <Fragment>
                      { showMedal &&
                        <Medal {...item.medal} size="small" align="left" className="leaderboard__medal" />
                      }
                      { showPlatforms &&
                        <PlatformList platforms={item.platforms} size="small" className="leaderboard__platforms" />
                      }
                      {item.path ? (
                        <Link
                          to={{
                            pathname: item.path,
                            state: state
                          }}
                          prefetch={prefetch}
                          className="leaderboard__name leaderboard__link"
                        >
                          <Name />
                        </Link>
                      ) : (
                        <div
                          className="leaderboard__name leaderboard__link"
                        >
                          <Name />
                        </div>
                      )}
                      {showClanTag &&
                        <ClanTag className="leaderboard__clan-tag" href={urlBuilder.clanUrl(item.clanId)}>{item.clanTag}</ClanTag>
                      }
                    </Fragment>
                  }
                </div>
              }
              {(keys.length > 0 || showGameDetails) &&
                <div className="leaderboard__body">
                  <div className="leaderboard__stats">
                    {showGameDetails &&
                      <div className="leaderboard__stat leaderboard__stat--game">
                        {item.game.isExternal ? (
                          <a href={item.game.path} target="_blank" rel="noopener noreferrer">
                            <span>{item.game.type}</span>
                            <Icon className="leaderboard__external" a11yText="View permalink">
                              <ExternalSvg />
                            </Icon>
                          </a>
                        ) : (
                          <Link to={item.game.path} prefetch={prefetch} className="leaderboard__link">
                            <span>{item.game.type}</span>
                          </Link>
                        )}
                        <RelativeDate className="leaderboard__stat-suffix" start={item.game.startDate} end={item.game.endDate} label={item.game.map ? `${item.game.map} -` : null} />
                      </div>
                    }
                    {showMedals &&
                      <div className="leaderboard__stat leaderboard__stat--medals">
                        <MedalList size="x-small" align="left" medals={item.medals} />
                      </div>
                    }
                    {showModifiers &&
                      <div className="leaderboard__stat leaderboard__stat--modifiers">
                        <ModifierList size="small" align="right" modifiers={item.modifiers} />
                      </div>
                    }
                    {keys.map((key, i) => {
                      if (showBonuses && key === 'bonuses') {
                        return item.bonuses.map((bonus, i) => {
                          const bonusKey = bonus.shortName.toLowerCase()

                          if (keys.indexOf(bonusKey) !== -1) return null

                          return (
                            <div key={i} className={classNames('leaderboard__stat', `leaderboard__stat--${bonusKey}`)} data-prefix={sentenceCase(bonus.shortName)}>{bonus.count}</div>
                          )
                        })
                      }

                      var value = item[key]
                      var exactValue

                      if (key === 'rank') value = rank
                      if (key === 'score' && showGameDetails) value = Math.max(item[key], 0)
                      if (value === null) value = constants.blank

                      if (isNaN(value)) {
                        value = `${value}`
                      } else {
                        exactValue = value
                        value = statsHelper.shortNumber(value)
                        if (value === exactValue) exactValue = null
                      }

                      return (
                        <div key={i} className={classNames('leaderboard__stat', `leaderboard__stat--${key}`)} data-prefix={sentenceCase(key)} data-exact={exactValue}><span>{value}</span></div>
                      )
                    })}
                  </div>
                </div>
              }
            </div>
          )
        })}
      </div>
    )
  }
}

Leaderboard.defaultProps = {
  descending: false,
  cutout: false,
  prefetch: true
}

Leaderboard.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array,
  sorting: PropTypes.object,
  cutout: PropTypes.bool,
  multiColumn: PropTypes.bool,
  className: PropTypes.string,
  prefetch: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
  stateKey: PropTypes.string
}

export default Leaderboard
