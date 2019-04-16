import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import { firstBy } from 'thenby'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Filter, getIds, filterById } from '../components/filter/Filter'
import Notification from '../components/notification/Notification'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')
const statsHelper = require('../utils/stats-helper')

const columns = ['rank', 'overall', 'active', 'size', 'score']

const getVisible = (tags, leaderboard) => {
  const ids = getIds(tags)
  return tags.length > 0
    ? leaderboard
        .filter(({ id }) => filterById(ids, id))
        .map((row, i) => ({
          ...row,
          rank: row.rank ? statsHelper.ranking(i + 1) : constants.blank
        }))
    : leaderboard
}

const setHash = tags => {
  const ids = getIds(tags)
  const hash = `${ids.length ? constants.prefix.hash : ''}${ids.join(',')}`

  if (history.pushState) {
    history.pushState(null, null, `${location.pathname}${hash}`)
  } else {
    location.hash = hash
  }
}

class CustomLeaderboardContainer extends PureComponent {
  constructor(props) {
    super(props)

    const hash = typeof location !== 'undefined' ? location.hash : ''
    var { meta } = this.props
    const { clans, selectedIds, event, leaderboards } = this.props
    const ids =
      selectedIds ||
      (hash.length
        ? hash
            .replace(constants.prefix.hash, '')
            .replace('top', '')
            .split(',')
            .filter(Boolean)
        : [])
    const totals = leaderboards.reduce(
      (result, { leaderboard }) => result.concat(leaderboard),
      []
    )
    const kicker = event.isCurrent
      ? constants.kicker.current
      : constants.kicker.previous
    var suggestions = []
    var tags = []
    var leaderboard = []

    const emptyTotals = {
      path: null,
      rank: false,
      overall: -1,
      active: event.isCurrent ? -1 : null,
      size: event.isCurrent ? -1 : null,
      score: -1,
      updated: null
    }

    clans.map(clan => {
      const clanId = clan.id
      const path = event.isCurrent
        ? urlBuilder.currentEventUrl(clanId)
        : urlBuilder.clanUrl(clanId, event.id)
      const suggestion = {
        id: clanId,
        name: `${clan.name} [${clan.tag}]`,
        shortName: clan.name
      }
      var total = totals.find(({ id }) => id === clanId)

      if (total) {
        total.rank = true
      } else {
        total = emptyTotals
      }

      total = {
        ...clan,
        ...total,
        path,
        medal: null
      }

      suggestions.push(suggestion)
      leaderboard.push(total)

      if (filterById(ids, clanId)) tags.push(suggestion)
    })

    leaderboard = leaderboard.sort(firstBy('score', -1).thenBy('name'))

    meta = Object.assign(
      {
        kicker,
        kickerHref: event.path,
        title: 'Overall leaderboard',
        description: `Create and share custom views of the overall leaderboard for the ${kicker} ${
          constants.meta.name
        } event`,
        overall: true
      },
      meta
    )

    this.state = {
      active: false,
      meta,
      leaderboard,
      hasLeaderboard: leaderboard.length > 0,
      visible:
        ids.length > 0
          ? leaderboard.filter(({ id }) => filterById(ids, id))
          : leaderboard,
      suggestions,
      tags
    }

    this.handleAddition = this.handleAddition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  handleAddition(tag) {
    const { tags } = this.state
    const existing = tags.find(({ id }) => id === tag.id)

    if (!existing) {
      tags.push({ id: tag.id, name: tag.shortName })

      this.handleChange(tags)
    }
  }

  handleDelete(index) {
    const { tags } = this.state

    tags.splice(index, 1)

    this.handleChange(tags)
  }

  handleChange(tags) {
    const { leaderboard } = this.state
    const visible = getVisible(tags, leaderboard)

    this.setState(
      {
        tags,
        visible
      },
      () => setHash(tags)
    )
  }

  render() {
    const { apiStatus, event, currentEventId, selectedIds } = this.props
    const {
      active,
      meta,
      hasLeaderboard,
      visible,
      tags,
      suggestions
    } = this.state
    const hasVisible = visible.length > 0
    const title = meta.title.split(' ')

    return (
      <PageContainer meta={meta}>
        <Lockup
          primary
          center
          kicker={meta.kicker}
          kickerHref={meta.kickerHref}
        >
          {currentEventId ? <RelativeDate apiStatus={apiStatus} /> : event.name}
        </Lockup>
        <Card cutout={hasVisible} center>
          <Lockup
            center
            kicker={title[0]}
            heading={title.length > 1 && title[1]}
          />
          {active && hasLeaderboard && !selectedIds && (
            <Filter
              kicker="Filter clans"
              placeholder="Enter clan name"
              suggestions={suggestions}
              tags={tags}
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
            />
          )}
          {!hasLeaderboard &&
            (currentEventId ? (
              <Notification>
                Leaderboards for this event are being calculated. Please check
                back later.
              </Notification>
            ) : (
              <Notification>
                Results for this event are being calculated. Please check back
                later.
              </Notification>
            ))}
        </Card>
        {hasVisible && (
          <Leaderboard
            cutout
            overall={meta.overall}
            data={visible}
            columns={columns}
          />
        )}
      </PageContainer>
    )
  }
}

CustomLeaderboardContainer.propTypes = {
  apiStatus: PropTypes.object,
  clans: PropTypes.array,
  selectedIds: PropTypes.array,
  event: PropTypes.object,
  leaderboards: PropTypes.array,
  currentEventId: PropTypes.number,
  meta: PropTypes.object
}

export default withRouteData(CustomLeaderboardContainer)
