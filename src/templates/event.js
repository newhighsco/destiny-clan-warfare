import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'

class EventTemplate extends Component {
  render () {
    const { data } = this.props
    const currentEventKicker = 'Current event'
    const pastEventKicker = 'Past event'
    const futureEventKicker = 'Coming soon'
    const title = data.event.isCurrent ? currentEventKicker : `${data.event.name} | Events`
    const kicker = data.event.isCurrent ? currentEventKicker : (data.event.isPast ? pastEventKicker : futureEventKicker)

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Card className="text-center">
          <Lockup className="text-center" kicker={kicker} heading={data.event.name} />
          {data.event.description &&
            <p>{data.event.description}</p>
          }
          {data.event.isPast &&
            <div className="temp">
              <p>Past event</p>
              <p>Name</p>
              <p>Description</p>
              <div className="temp">
                <p>List of modifier icons</p>
              </div>
              <div className="temp">
                <p>Clan winners medals</p>
              </div>
              <div className="temp">
                <p>Leaderboard of all clans for each division</p>
                <p>Each "clan link" links through the general "Clan page" (there is no player history on that page)</p>
              </div>
            </div>
          }
          {data.event.isFuture &&
            <div className="temp">
              <p>Future event</p>
              <p>Preview of future event</p>
            </div>
          }
          {data.event.isCurrent &&
            <div className="temp">
              <p>Current event</p>
              <p>Name</p>
              <p>Description</p>
              <p>Dates / countdown</p>
              <div className="temp">
                <p>List of modifier icons</p>
              </div>
              <div className="temp">
                <p>Leaderboard of all clans for each division</p>
                <p>Each "clan links" links through to the new "Current event clan page" (the one with the player history for this event on it)</p>
              </div>
            </div>
          }
        </Card>
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
      name
      description
      startDate
      endDate
      isPast
      isFuture
      isCurrent
    }
  }
`
