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

const columns = [
  'rank',
  'overall',
  'active',
  'size',
  'score'
]

const getVisible = (tags, leaderboard) => {
  const ids = getIds(tags)
  return tags.length > 0 ? leaderboard.filter(({ id }) => filterById(ids, id)) : []
}

const setHash = tags => {
  const ids = getIds(tags)
  const hash = `${ids.length ? constants.prefix.hash : ''}${ids.join(',')}`

  if (history.pushState) {
    history.pushState(null, null, `${window.location.pathname}${hash}`)
  } else {
    location.hash = hash
  }
}

class CustomLeaderboardContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { events, currentEventLeaderboards, currentEventId, previousEventId } = this.props
    const eventId = currentEventId || previousEventId
    const event = events.find(({ id }) => id === eventId)
    const meta = {
      kicker: event.isCurrent ? constants.kicker.current : constants.kicker.previous,
      kickerHref: event.path,
      title: 'Custom leaderboard',
      description: `Create and share custom leaderboards for the latest ${constants.meta.name} event`
    }

    this.state = {
      active: false,
      meta,
      event,
      leaderboards: event.isCurrent ? currentEventLeaderboards : event.leaderboards,
      visible: []
    }

    this.handleAddition = this.handleAddition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const { active, event, leaderboards } = this.state
    const { history: { location: { hash } }, clans } = this.props
    const ids = hash.replace(constants.prefix.hash, '').split(',')
    const totals = leaderboards.reduce((result, { leaderboard }) => result.concat(leaderboard), [])
    var suggestions = []
    var tags = []
    var leaderboard = []

    const emptyTotal = {
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
      const path = event.isCurrent ? urlBuilder.currentEventUrl(clanId) : urlBuilder.clanUrl(clanId, event.id)
      const suggestion = { id: clanId, name: clan.name }
      var total = totals.find(({ id }) => id === clanId)

      if (total) {
        total.rank = true
      } else {
        total = emptyTotal
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

    if (!active) {
      this.setState({
        active: true,
        leaderboard,
        hasLeaderboard: leaderboard.length > 0,
        visible: leaderboard.filter(({ id }) => filterById(ids, id)),
        suggestions,
        tags
      })
    }
  }

  handleAddition (tag) {
    const { tags } = this.state
    const existing = tags.find(({ id }) => id === tag.id)

    if (!existing) {
      tags.push(tag)

      this.handleChange(tags)
    }
  }

  handleDelete (index) {
    const { tags } = this.state

    tags.splice(index, 1)

    this.handleChange(tags)
  }

  handleChange (tags) {
    const { leaderboard } = this.state
    const visible = getVisible(tags, leaderboard)

    this.setState({
      tags,
      visible
    }, () => setHash(tags))
  }

  render () {
    const { apiStatus, currentEventId } = this.props
    const { active, meta, hasLeaderboard, visible, tags, suggestions } = this.state
    const hasVisible = visible.length > 0

    return (
      <PageContainer meta={meta}>
        <Lockup primary center kicker={meta.kicker} kickerHref={meta.kickerHref}>
          {currentEventId &&
            <RelativeDate apiStatus={apiStatus} />
          }
        </Lockup>
        <Card cutout={hasVisible} center>
          <Lockup center kicker="Custom" heading="leaderboard" />
          {active && hasLeaderboard &&
            <Filter
              kicker="Add clans"
              placeholder="Enter clan name"
              suggestions={suggestions}
              tags={tags}
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
            />
          }
          {!hasLeaderboard &&
            (currentEventId ? (
              <Notification>Leaderboards for this event are being calculated. Please check back later.</Notification>
            ) : (
              <Notification>Results for this event are being calculated. Please check back later.</Notification>
            ))
          }
        </Card>
        {hasVisible &&
          <Leaderboard cutout data={visible} columns={columns} />
        }
      </PageContainer>
    )
  }
}

CustomLeaderboardContainer.propTypes = {
  history: PropTypes.object,
  apiStatus: PropTypes.object,
  clans: PropTypes.array,
  events: PropTypes.array,
  currentEventLeaderboards: PropTypes.array,
  currentEventId: PropTypes.number,
  previousEventId: PropTypes.number
}

export default withRouteData(CustomLeaderboardContainer)
