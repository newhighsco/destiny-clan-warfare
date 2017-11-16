import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'

class EventsPage extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>Events</title>
        </Helmet>
        <Lockup kicker="Beta site" heading="Events" />

        <ul>
          {data.allEvent.edges.map(({ node }) => (
            <li key={node.id}>
              <Link to={node.path}>{node.name}</Link>
            </li>
          ))}
        </ul>

        <div className="temp">
          <p>Current event</p>
          <p>Name</p>
          <p>Description</p>
          <p>Dates / countdown</p>
          <div className="temp">
            <p>List of modifier icons</p>
          </div>
          <div className="temp">
            <p>Top 3/5 for each division</p>
            <p>Name, Overall score, Active members (I can work this out), Total members (I can work this out)</p>
            <p>Link to see all</p>
          </div>
        </div>

        <div className="temp">
          <p>Preview of next event (if applicable)</p>
        </div>

        <div className="temp">
          <p>Past events list</p>
          <p>Name, dates, modifiers, link to view past event in more details</p>
        </div>
      </PageContainer>
    )
  }
}

EventsPage.propTypes = {
  data: PropTypes.object
}

export default EventsPage

export const data = {
  layout: 'content'
}

export const pageQuery = graphql`
  query EventsPageQuery {
    allEvent(sort: { fields: [ startDate ], order: DESC }) {
      edges {
        node {
          id
          path
          name
          type
          description
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
