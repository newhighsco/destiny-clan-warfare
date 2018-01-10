import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import { Button, ButtonGroup } from '../components/button/Button'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { ModifierList } from '../components/modifier/Modifier'
import { TabContainer, Tab } from '../components/tab/Tab'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'
import Advert from '../components/advert/Advert'
import Enrollment from '../components/enrollment/Enrollment'
import FutureEvent from '../components/event/FutureEvent'
import LogoImage from '../images/avatar-512x512.jpg'
import Notification from '../components/notification/Notification'

const constants = require('../utils/constants')

class IndexPage extends Component {
  render () {
    const { data } = this.props
    const currentEvents = data.allEvent.edges.filter(({ node }) => node.isCurrent)
    const pastEvents = data.allEvent.edges.filter(({ node }) => node.isPast).slice(0, 1)
    const futureEvents = data.allEvent.edges.filter(({ node }) => node.isFuture).reverse().slice(0, 1)
    const schema = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: constants.meta.name,
      url: process.env.GATSBY_SITE_URL,
      logo: `${process.env.GATSBY_SITE_URL}${LogoImage}`,
      sameAs: [
        'https://twitter.com/destinyclanwar'
      ]
    }

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Enrollment status={data.apiStatus} clans={data.allClan.edges.map(({ node }) => node)} />
        {currentEvents.length > 0 &&
          <Fragment>
            <Lockup primary center element="h1" kicker={`${constants.kicker.current}${currentEvents.length > 1 ? 's' : ''}`}>
              <RelativeDate label={constants.relativeDate.updated} date={currentEvents[0].node.updatedDate} />
            </Lockup>
            {currentEvents.map(({ node }) => {
              return (
                <Fragment key={node.id}>
                  <Card cutout className="text-center">
                    <Lockup center element="h2" headingHref={node.path} heading={node.name} />
                    <RelativeDate label={constants.relativeDate.current} date={node.endDate} />
                    {node.description &&
                      <p>{node.description}</p>
                    }
                    <ModifierList modifiers={node.modifiers} />
                  </Card>
                  <TabContainer cutout>
                    {node.leaderboards.large.length > 0 &&
                      <Tab name={constants.division.large}>
                        <Leaderboard data={node.leaderboards.large.slice(0, 3)} />
                      </Tab>
                    }
                    {node.leaderboards.medium.length > 0 &&
                      <Tab name={constants.division.medium}>
                        <Leaderboard data={node.leaderboards.medium.slice(0, 3)} />
                      </Tab>
                    }
                    {node.leaderboards.small.length > 0 &&
                      <Tab name={constants.division.small}>
                        <Leaderboard data={node.leaderboards.small.slice(0, 3)} />
                      </Tab>
                    }
                  </TabContainer>
                  <ButtonGroup>
                    <Button href={`${node.path}#leaderboard`}>View full leaderboard</Button>
                  </ButtonGroup>
                </Fragment>
              )
            })}
          </Fragment>
        }
        {pastEvents.length > 0 &&
          <Fragment>
            {currentEvents.length > 0 &&
              <Advert />
            }
            <Lockup center primary element="h1" kicker={`${constants.kicker.previous}${pastEvents.length > 1 ? 's' : ''}`} />
            {pastEvents.map(({ node }) => {
              const isCalculated = node.isCalculated
              const leaderboard = isCalculated ? node.results.filter(({ score }) => score > 0) : []

              return (
                <Fragment key={node.id}>
                  <Card cutout className="text-center">
                    <Lockup center element="h2" headingHref={node.path} heading={node.name} />
                    <RelativeDate label={constants.relativeDate.past} date={node.endDate} />
                    {node.description &&
                      <p>{node.description}</p>
                    }
                    <ModifierList modifiers={node.modifiers} />
                    {!isCalculated &&
                      <Notification>Results for this event are being calculated. Please check back later.</Notification>
                    }
                  </Card>
                  {isCalculated &&
                    <Fragment>
                      <TabContainer cutout>
                        <Tab name="Winners">
                          <Leaderboard data={leaderboard} sorting={{ division: 'ASC' }} />
                        </Tab>
                      </TabContainer>
                      <ButtonGroup>
                        <Button href={`${node.path}#results`}>View full results</Button>
                      </ButtonGroup>
                    </Fragment>
                  }
                </Fragment>
              )
            })}
          </Fragment>
        }
        {futureEvents.length > 0 &&
          <Fragment>
            {pastEvents.length > 0 &&
              <Advert />
            }
            <Lockup center primary element="h1" kicker={`${constants.kicker.next}${futureEvents.length > 1 ? 's' : ''}`} />
            {futureEvents.map(({ node }) => {
              return (
                <FutureEvent key={node.id} event={node} element="h2" />
              )
            })}
            <ButtonGroup>
              <Button href="/#enroll">Enroll your clan today</Button>
            </ButtonGroup>
          </Fragment>
        }
      </PageContainer>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    apiStatus {
      enrollmentOpen
      bungieCode
    }
    allClan(sort: { fields: [ nameSortable ] }) {
      edges {
        node {
          path
          id
        }
      }
    }
    allEvent(sort: { fields: [ startDate ], order: DESC }) {
      edges {
        node {
          id
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
            medal {
              tier
              name
              description
            }
          }
          ...modifiersFragment
        }
      }
    }
  }
`
