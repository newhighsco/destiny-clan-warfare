import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { ModifierList } from '../components/modifier/Modifier'
import { TabContainer, Tab } from '../components/tab/Tab'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'
import { MedalList } from '../components/medal/Medal'
import FutureEvent from '../components/event/FutureEvent'
import { Button, ButtonGroup } from '../components/button/Button'
import SchemaImage from '../images/favicon-1200x1200.png'
import Notification from '../components/notification/Notification'

const moment = require('moment')
const constants = require('../utils/constants')
const medalBuilder = require('../utils/medal-builder')

class EventTemplate extends Component {
  render () {
    const { data } = this.props
    const isCalculated = data.event.isCalculated
    const kicker = data.event.isCurrent ? constants.kicker.current : (data.event.isPast ? constants.kicker.past : constants.kicker.future)
    const title = `${data.event.name} | ${kicker}`
    const description = data.event.isCurrent
      ? `The divisional leaderboards for the current ${constants.meta.name} event`
      : (data.event.isPast
        ? `The results of past ${data.event.name} ${constants.meta.name} event`
        : `Preview of upcoming ${data.event.name} ${constants.meta.name} event`)
    const url = `${process.env.GATSBY_SITE_URL}${data.event.path}`
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'Event',
      url: url,
      name: `${constants.meta.name} - ${data.event.name}`,
      description: data.event.description,
      startDate: moment(data.event.startDate).format(),
      endDate: moment(data.event.endDate).format(),
      image: `${process.env.GATSBY_SITE_URL}${SchemaImage}`,
      location: {
        '@type': 'Place',
        name: constants.meta.name,
        sameAs: process.env.GATSBY_SITE_URL,
        address: url
      }
    }
    var largeLeaderboard = data.event.leaderboards.large
    var mediumLeaderboard = data.event.leaderboards.medium
    var smallLeaderboard = data.event.leaderboards.small
    var leaderboardColumns = null
    var memberMedals = data.event.medals.members ? data.event.medals.members
      .filter(({ tier }) => tier > 1)
      .sort((a, b) => medalBuilder.sort(a, b)) : []
    var clanMedals = data.event.medals.clans ? data.event.medals.clans
      .filter(({ tier }) => tier > 1)
      .sort((a, b) => medalBuilder.sort(a, b)) : []

    if (data.event.isPast) {
      largeLeaderboard = medalBuilder.embellishLeaderboard(largeLeaderboard, constants.division.large)
      mediumLeaderboard = medalBuilder.embellishLeaderboard(mediumLeaderboard, constants.division.medium)
      smallLeaderboard = medalBuilder.embellishLeaderboard(smallLeaderboard, constants.division.small)
      leaderboardColumns = [ 'color', 'foreground', 'background', 'name', 'medal', 'rank', 'score' ]
    }

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        {data.event.isCurrent &&
          <Fragment>
            <Lockup primary center kicker={kicker}>
              <RelativeDate label={constants.relativeDate.updated} date={data.event.updatedDate} />
            </Lockup>
            <Card cutout className="text-center">
              <Lockup center heading={data.event.name} />
              <RelativeDate label={constants.relativeDate.current} date={data.event.endDate} />
              {data.event.description &&
                <p>{data.event.description}</p>
              }
              <ModifierList modifiers={data.event.modifiers} />
            </Card>
            <TabContainer id="leaderboard" cutout>
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
            <ButtonGroup>
              <Button href="/#enroll">Enroll your clan today</Button>
            </ButtonGroup>
          </Fragment>
        }
        {data.event.isPast &&
          <Fragment>
            <Lockup primary center kicker={kicker} />
            <Card cutout className="text-center">
              <Lockup center heading={data.event.name} />
              <RelativeDate label={constants.relativeDate.past} date={data.event.endDate} />
              {data.event.description &&
                <p>{data.event.description}</p>
              }
              <ModifierList modifiers={data.event.modifiers} />
              <MedalList medals={clanMedals} />
              <MedalList medals={memberMedals} />
              {!isCalculated &&
                <Notification id="results">Results for this event are being calculated. Please check back later.</Notification>
              }
            </Card>
            {isCalculated &&
              <TabContainer id="results" cutout>
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
          </Fragment>
        }
        {data.event.isFuture &&
          <Fragment>
            <Lockup primary center kicker={kicker} />
            <FutureEvent event={data.event} />
            <ButtonGroup>
              <Button href="/#enroll">Enroll your clan today</Button>
            </ButtonGroup>
          </Fragment>
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
    apiStatus {
      bungieCode
    }
    event(id: { eq: $id }) {
      updatedDate
      path
      name
      description
      startDate
      endDate
      isCurrent
      isPast
      isFuture
      isCalculated
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
      ...eventMedalsFragment
    }
  }
`
