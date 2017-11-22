import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Modifiers from '../components/modifiers/Modifiers'
import { TabContainer, Tab } from '../components/tab/Tab'
import Leaderboard from '../components/leaderboard/Leaderboard'
import Medals from '../components/medals/Medals'
import Button from '../components/button/Button'

const moment = require('moment')
const constants = require('../utils/constants')

class EventTemplate extends Component {
  render () {
    const { data } = this.props
    const currentEventKicker = 'Current event'
    const pastEventKicker = 'Past event'
    const futureEventKicker = 'Coming soon'
    const kicker = data.event.isCurrent ? currentEventKicker : (data.event.isPast ? pastEventKicker : futureEventKicker)
    const title = `${data.event.name} | ${kicker}`

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Lockup center kicker={kicker}>
          {data.event.isCurrent &&
            `Updated ${moment.utc(data.event.updatedDate).format('HH:mm [UTC]')}`
          }
        </Lockup>
        <Card cutout className="text-center">
          <Lockup center heading={data.event.name} />
          {data.event.isCurrent &&
            <p>Ends {moment(data.event.endDate).fromNow()}</p>
          }
          {data.event.isPast &&
            <p>Ended {moment(data.event.endDate).fromNow()}</p>
          }
          {data.event.isFuture &&
            <p>Starts {moment(data.event.startDate).fromNow()}</p>
          }
          {data.event.description &&
            <p>{data.event.description}</p>
          }
          <Modifiers data={data.event.modifiers} />
          {data.event.isPast &&
            <Medals key="medals" count={9} />
          }
          {data.event.isFuture &&
            <Button href="/">Join today</Button>
          }
        </Card>
        {!data.event.isFuture &&
          <TabContainer cutout>
            <Tab name={constants.division.large}>
              <Leaderboard data={data.event.leaderboards.large} />
            </Tab>
            <Tab name={constants.division.medium}>
              <Leaderboard data={data.event.leaderboards.medium} />
            </Tab>
            <Tab name={constants.division.small}>
              <Leaderboard data={data.event.leaderboards.small} />
            </Tab>
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
      leaderboards {
        large {
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
          rank
          score
        }
        medium {
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
          rank
          score
        }
        small {
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
          rank
          score
        }
      }
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
