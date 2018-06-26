import React, { PureComponent } from 'react'
import { withRouteData } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Filter, getIds, filterById } from '../components/filter/Filter'
import Notification from '../components/notification/Notification'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'

const constants = require('../utils/constants')

const columns = [
  'rank',
  'overall',
  'active',
  'size',
  'score'
]

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

    const { history: { location: { hash } }, clans, events, currentEventId, previousEventId } = this.props
    const eventId = currentEventId || previousEventId
    const event = events.find(({ id }) => id === eventId)
    const ids = hash.replace(constants.prefix.hash, '').split(',')
    const suggestions = clans.map(({ id, name }) => ({ id: `${id}`, name }))
    const tags = suggestions.filter(({ id }) => filterById(ids, id))
    const leaderboard = event.leaderboards.reduce((result, { leaderboard }) => result.concat(leaderboard), [])
    const meta = {
      kicker: currentEventId ? constants.kicker.current : constants.kicker.previous,
      kickerHref: event.path,
      title: 'Custom leaderboard',
      description: `Create and share custom leaderboards for the latest ${constants.meta.name} event`
    }

    this.state = {
      active: false,
      meta,
      leaderboard,
      suggestions,
      tags
    }

    this.handleAddition = this.handleAddition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount () {
    const { active } = this.state

    if (!active) this.setState({ active: true })
  }

  handleAddition (tag) {
    const { tags } = this.state
    const existing = tags.find(({ id }) => id === tag.id)

    if (!existing) {
      tags.push(tag)

      this.setState({ tags }, () => setHash(tags))
    }
  }

  handleDelete (index) {
    const { tags } = this.state

    tags.splice(index, 1)

    this.setState({ tags }, () => setHash(tags))
  }

  render () {
    const { currentEventId } = this.props
    const { active, meta, leaderboard, tags, suggestions } = this.state
    const hasLeaderboard = leaderboard.length > 0
    const ids = getIds(tags)
    const visible = tags.length > 0 ? leaderboard.filter(({ id }) => filterById(ids, id)) : []
    const hasVisible = visible && visible.length > 0

    return (
      <PageContainer meta={meta}>
        <Lockup primary center kicker={meta.kicker} kickerHref={meta.kickerHref}>
          {currentEventId &&
            <RelativeDate status />
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
          <Leaderboard cutout data={leaderboard} columns={columns} />
        }
      </PageContainer>
    )
  }
}

CustomLeaderboardContainer.propTypes = {
  history: PropTypes.object,
  clans: PropTypes.array,
  events: PropTypes.array,
  currentEventId: PropTypes.number,
  previousEventId: PropTypes.number
}

export default withRouteData(CustomLeaderboardContainer)
