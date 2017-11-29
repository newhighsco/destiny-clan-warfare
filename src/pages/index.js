import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Button from '../components/button/Button'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Modifiers from '../components/modifiers/Modifiers'
import { TabContainer, Tab } from '../components/tab/Tab'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'

const constants = require('../utils/constants')

class IndexPage extends Component {
  render () {
    const { data } = this.props
    const currentEvents = data.allEvent.edges.filter(({ node }) => node.isCurrent)
    const pastEvents = data.allEvent.edges.filter(({ node }) => node.isPast).slice(0, 1)
    const futureEvents = data.allEvent.edges.filter(({ node }) => node.isFuture).reverse().slice(0, 1)

    return (
      <PageContainer>
        <div className="temp">
          <p>Introduction/Search/Enrollment</p>
        </div>
        {currentEvents.length > 0 && [
          <Lockup key="kicker" center element="h1" kicker={`Current event${currentEvents.length > 1 ? 's' : ''}`}>
            <RelativeDate label={constants.relativeDate.updated} date={currentEvents[0].node.updatedDate} />
          </Lockup>,
          currentEvents.map(({ node }) => {
            return ([
              <Card key={node.id} className="text-center">
                <Lockup center element="h2" headingHref={node.path} heading={node.name} />
                <RelativeDate label={constants.relativeDate.current} date={node.endDate} />
                {node.description &&
                  <p>{node.description}</p>
                }
                <Modifiers data={node.modifiers} />
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
              <div className="button-group">
                <Button href={node.path}>View full leaderboard</Button>
              </div>
            ])
          })
        ]}
        {pastEvents.length > 0 && [
          <Lockup key="kicker" center element="h1" kicker={`Previous event${pastEvents.length > 1 ? 's' : ''}`} />,
          pastEvents.map(({ node }) => {
            const leaderboard = node.results.filter(({ score }) => score > 0)

            return ([
              <Card cutout key={node.id} className="text-center">
                <Lockup center element="h2" headingHref={node.path} heading={node.name} />
                <RelativeDate label={constants.relativeDate.past} date={node.endDate} />
                {node.description &&
                  <p>{node.description}</p>
                }
                <Modifiers data={node.modifiers} />
              </Card>,
              leaderboard.length > 0 && [
                <TabContainer cutout>
                  <Tab name="Winners">
                    <Leaderboard data={leaderboard} />
                  </Tab>
                </TabContainer>,
                <div className="button-group">
                  <Button href={node.path}>View full results</Button>
                </div>
              ]
            ])
          })
        ]}
        {futureEvents.length > 0 && [
          <Lockup key="kicker" center element="h1" kicker="Next event" />,
          futureEvents.map(({ node }) => {
            return (
              <Card key={node.id} className="text-center">
                <Lockup center element="h2" headingHref={node.path} heading={node.name} />
                <RelativeDate label={constants.relativeDate.future} date={node.startDate} />
                {node.description &&
                  <p>{node.description}</p>
                }
                <Modifiers data={node.modifiers} />
              </Card>
            )
          })
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
              active
              size
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
              active
              size
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
              active
              size
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
