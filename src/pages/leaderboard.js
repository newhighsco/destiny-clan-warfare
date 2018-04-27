import React, { Component } from 'react'
import { withRouteData, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { Filter, getIds, filterById } from '../components/filter/Filter'
import Notification from '../components/notification/Notification'
import Leaderboard from '../components/leaderboard/Leaderboard'
import Enrollment from '../components/enrollment/Enrollment'

const constants = require('../utils/constants')

const setHash = tags => {
  var hash = `${constants.prefix.hash}${getIds(tags).join(',')}`

  if (history.pushState) {
    history.pushState(null, null, hash)
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
      suggestions,
      tags
    }

    this.handleAddition = this.handleAddition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
    const { leaderboard } = this.props
    var { tags, suggestions } = this.state
    const custom = tags.length > 0
    const ids = getIds(tags)
    const visible = custom ? leaderboard.filter(({ id }) => filterById(ids, id)) : leaderboard
    const kicker = custom ? 'Custom' : 'Overall'
    const title = `${kicker} Leaderboard`
    const description = 'TBC'
    const hasLeaderboard = visible && visible.length > 0

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Enrollment />
        <Card cutout={hasLeaderboard} center>
          <Lockup primary center kicker={kicker} heading="Leaderboard" />
          <Filter
            kicker="Filter by clans"
            placeholder="Enter clan name"
            suggestions={suggestions}
            tags={tags}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
          />
          {!hasLeaderboard &&
            (custom ? (
              <Notification>We were unable to find any matching clans. Please try again.</Notification>
            ) : (
              <Notification>Overal leaderboard is being calculated. Please check back later.</Notification>
            ))
          }
        </Card>
        {hasLeaderboard &&
          <Leaderboard cutout data={visible} />
        }
      </PageContainer>
    )
  }
}

LeaderboardPage.propTypes = {
  leaderboard: PropTypes.array,
  history: PropTypes.object
}

export default withRouteData(LeaderboardPage)
