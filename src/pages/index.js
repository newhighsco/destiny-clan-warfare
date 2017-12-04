import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

const constants = require('../utils/constants')

class IndexPage extends Component {
  render () {
    const { data } = this.props
    const currentEvents = data.allEvent.edges.filter(({ node }) => node.isCurrent)
    const pastEvents = data.allEvent.edges.filter(({ node }) => node.isPast).slice(0, 1)
    const futureEvents = data.allEvent.edges.filter(({ node }) => node.isFuture).reverse().slice(0, 1)

    return (
      <PageContainer>
        <Enrollment />
        {currentEvents.length > 0 && [
          <Lockup key="kicker" center element="h1" kicker={`${constants.kicker.current}${currentEvents.length > 1 ? 's' : ''}`}>
            <RelativeDate label={constants.relativeDate.updated} date={currentEvents[0].node.updatedDate} />
          </Lockup>,
          currentEvents.map(({ node }) => {
            return ([
              <Card key={node.id} cutout className="text-center">
                <Lockup center element="h2" headingHref={node.path} heading={node.name} />
                <RelativeDate label={constants.relativeDate.current} date={node.endDate} />
                {node.description &&
                  <p>{node.description}</p>
                }
                <ModifierList modifiers={node.modifiers} />
              </Card>,
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
              </TabContainer>,
              <ButtonGroup>
                <Button href={node.path}>View full leaderboard</Button>
              </ButtonGroup>
            ])
          })
        ]}
        {pastEvents.length > 0 && [
          <Advert key="advert" />,
          <Lockup key="kicker" center element="h1" kicker={`${constants.kicker.past}${pastEvents.length > 1 ? 's' : ''}`} />,
          pastEvents.map(({ node }) => {
            const leaderboard = node.results.filter(({ score }) => score > 0)

            return ([
              <Card key={node.id} cutout className="text-center">
                <Lockup center element="h2" headingHref={node.path} heading={node.name} />
                <RelativeDate label={constants.relativeDate.past} date={node.endDate} />
                {node.description &&
                  <p>{node.description}</p>
                }
                <ModifierList modifiers={node.modifiers} />
              </Card>,
              leaderboard.length > 0 && [
                <TabContainer cutout>
                  <Tab name="Winners">
                    <Leaderboard data={leaderboard} />
                  </Tab>
                </TabContainer>,
                <ButtonGroup>
                  <Button href={node.path}>View full results</Button>
                </ButtonGroup>
              ]
            ])
          })
        ]}
        {futureEvents.length > 0 && [
          <Advert key="advert" />,
          <Lockup key="kicker" center element="h1" kicker={constants.kicker.future} />,
          futureEvents.map(({ node }) => {
            return (
              <FutureEvent event={node} element="h2" />
            )
          }),
          <ButtonGroup key="button">
            <Button href="/#enroll">Enroll your clan today</Button>
          </ButtonGroup>
        ]}
      </PageContainer>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const data = {
  layout: 'content'
}

export const pageQuery = graphql`
  query IndexPageQuery {
    allEvent(sort: { fields: [ startDate ], order: DESC }) {
      edges {
        node {
          updatedDate
          path
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
