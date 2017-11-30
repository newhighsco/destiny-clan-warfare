import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Modifiers from '../components/modifiers/Modifiers'
import { TabContainer, Tab } from '../components/tab/Tab'
import Leaderboard from '../components/leaderboard/Leaderboard'
import Button from '../components/button/Button'
import RelativeDate from '../components/relative-date/RelativeDate'

const constants = require('../utils/constants')
const medalBuilder = require('../utils/medal-builder')

class EventTemplate extends Component {
  render () {
    const { data } = this.props
    const currentEventKicker = 'Current event'
    const pastEventKicker = 'Past event'
    const futureEventKicker = 'Coming soon'
    const kicker = data.event.isCurrent ? currentEventKicker : (data.event.isPast ? pastEventKicker : futureEventKicker)
    const title = `${data.event.name} | ${kicker}`
    var largeLeaderboard = data.event.leaderboards.large
    var mediumLeaderboard = data.event.leaderboards.medium
    var smallLeaderboard = data.event.leaderboards.small
    var leaderboardColumns = null

    if (data.event.isPast) {
      largeLeaderboard = medalBuilder.embellishLeaderboard(largeLeaderboard, constants.division.large)
      mediumLeaderboard = medalBuilder.embellishLeaderboard(mediumLeaderboard, constants.division.medium)
      smallLeaderboard = medalBuilder.embellishLeaderboard(smallLeaderboard, constants.division.small)
      leaderboardColumns = [ 'color', 'foreground', 'background', 'name', 'medal', 'rank', 'score' ]
    }

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Lockup center kicker={kicker}>
          {data.event.isCurrent &&
            <RelativeDate label={constants.relativeDate.updated} date={data.event.updatedDate} />
          }
        </Lockup>
        <Card cutout className="text-center">
          <Lockup center heading={data.event.name} />
          {data.event.isCurrent &&
            <RelativeDate label={constants.relativeDate.current} date={data.event.endDate} />
          }
          {data.event.isPast &&
            <RelativeDate label={constants.relativeDate.past} date={data.event.endDate} />
          }
          {data.event.isFuture &&
            <RelativeDate label={constants.relativeDate.future} date={data.event.startDate} />
          }
          {data.event.description &&
            <p>{data.event.description}</p>
          }
          <Modifiers data={data.event.modifiers} />
          {data.event.isFuture &&
            <Button href="/">Join today</Button>
          }
        </Card>
        {!data.event.isFuture &&
          <TabContainer cutout>
            {largeLeaderboard.length > 0 &&
              <Tab name={constants.division.large}>
                <Leaderboard data={largeLeaderboard} columns={leaderboardColumns} />
              </Tab>
            }
            {mediumLeaderboard.length > 0 &&
              <Tab name={constants.division.medium}>
                <Leaderboard data={mediumLeaderboard} columns={leaderboardColumns} />
              </Tab>
            }
            {smallLeaderboard.length > 0 &&
              <Tab name={constants.division.small}>
                <Leaderboard data={smallLeaderboard} columns={leaderboardColumns} />
              </Tab>
            }
          </TabContainer>
        }
      </PageContainer>
    )
  }
}

EventTemplate.propTypes = {
  data: PropTypes.object
}

export default EventTemplate

export const pageQuery = graphql`
  query EventTemplateQuery($id: String!) {
    event(id: { eq: $id }) {
      updatedDate
      name
      description
      startDate
      endDate
      isCurrent
      isPast
      isFuture
      ...leaderboardFragment
      results {
        path
        name
        color
        foreground {
          color
          icon
        }
        background {
          color
          icon
        }
        division
        score
      }
      ...modifiersFragment
    }
  }
`
