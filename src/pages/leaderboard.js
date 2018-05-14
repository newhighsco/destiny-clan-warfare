import React, { Component } from 'react'
import { withRouteData, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Filter, getIds, filterById } from '../components/filter/Filter'
import Notification from '../components/notification/Notification'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'

const constants = require('../utils/constants')

const setHash = tags => {
  const ids = getIds(tags)
  const hash = `${ids.length ? constants.prefix.hash : ''}${ids.join(',')}`

  if (history.pushState) {
    history.pushState(null, null, `${window.location.pathname}${hash}`)
  } else {
    location.hash = hash
  }
}

class LeaderboardPage extends Component {
  constructor (props) {
    super(props)

    const { leaderboard, history: { location: { hash } } } = this.props
    const ids = hash.replace(constants.prefix.hash, '').split(',')
    const suggestions = leaderboard.map(({ id, name }) => ({ id: `${id}`, name }))
    const tags = suggestions.filter(({ id }) => filterById(ids, id))

    this.state = {
      active: false,
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
    const { event, leaderboard } = this.props
    const { active, tags, suggestions } = this.state
    const hasLeaderboard = leaderboard.length > 0
    const ids = getIds(tags)
    const visible = tags.length > 0 ? leaderboard.filter(({ id }) => filterById(ids, id)) : []
    const title = 'Custom leaderboard'
    const description = `Create and share custom leaderboards for the latest ${constants.meta.name} event`
    const isCurrent = event.isCurrent
    const hasVisible = visible && visible.length > 0
    const columns = hasVisible ? Object.keys(visible[0]) : []

    if (!isCurrent) {
      columns.splice(columns.indexOf('active'), 1)
      columns.splice(columns.indexOf('size'), 1)
    }

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Lockup primary center kicker={isCurrent ? constants.kicker.current : constants.kicker.previous} kickerHref={event.path}>
          {isCurrent &&
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
            (isCurrent ? (
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

LeaderboardPage.propTypes = {
  event: PropTypes.object,
  leaderboard: PropTypes.array,
  history: PropTypes.object
}

export default withRouteData(LeaderboardPage)
