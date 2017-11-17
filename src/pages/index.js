import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Button from '../components/button/Button'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'
import Modifiers from '../components/modifiers/Modifiers'

class IndexPage extends Component {
  render () {
    const { data } = this.props
    const currentEvents = data.allEvent.edges.filter(({ node }) => node.isCurrent)
    const pastEvents = data.allEvent.edges.filter(({ node }) => node.isPast)
    const futureEvents = data.allEvent.edges.filter(({ node }) => node.isFuture).reverse()

    return (
      <PageContainer>
        <div className="temp">
          <p>Introduction/Search/Enrollment</p>
        </div>
        {currentEvents.slice(0, 1).map(({ node }) => {
          return (
            <Card key={node.id} className="text-center">
              <Lockup className="text-center" kicker="Current event" kickerHref={node.path} heading={node.name} />
              {node.description &&
                <p>{node.description}</p>
              }
              <Modifiers data={node.modifiers} />
              <div className="temp">
                <p>Dates / countdown</p>
                <div className="temp">
                  <p>Current leaderboard</p>
                  <p>Top 3/5 for each division</p>
                  <ul>
                    <li>Clan name</li>
                    <li>Current event total score</li>
                    <li>Current event Active member count</li>
                    <li>Total member count</li>
                  </ul>
                </div>
              </div>
              <Button href={node.path}>View leaderboard</Button>
            </Card>
          )
        })}
        {futureEvents.slice(0, 1).map(({ node }) => {
          return (
            <Card key={node.id} className="text-center">
              <Lockup className="text-center" kicker="Coming soon" kickerHref={node.path} heading={node.name} />
              {node.description &&
                <p>{node.description}</p>
              }
              <Modifiers data={node.modifiers} />
              <div className="temp">
                <p>Preview of future event</p>
              </div>
            </Card>
          )
        })}
        {pastEvents.slice(0, 1).map(({ node }) => {
          return (
            <Card key={node.id} className="text-center">
              <Lockup className="text-center" kicker="Previous event" kickerHref={node.path} heading={node.name} />
              {node.description &&
                <p>{node.description}</p>
              }
              <div className="temp">
                <p>Dates</p>
                <div className="temp">
                  <p>Results</p>
                  <p>Top 3/5 for each division</p>
                  <ul>
                    <li>Clan name</li>
                    <li>Clan medals won</li>
                    <li>Final event stats - TBC</li>
                  </ul>
                </div>
              </div>
              <Button href={node.path}>View results</Button>
            </Card>
          )
        })}
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
          id
          path
          name
          description
          modifiers {
            id
            name
          }
          startDate
          endDate
          isPast
          isFuture
          isCurrent
        }
      }
    }
  }
`
