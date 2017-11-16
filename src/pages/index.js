import React, { Component } from 'react'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'

class IndexPage extends Component {
  render () {
    return (
      <PageContainer>
        <Lockup kicker="Beta site" heading="Homepage" />

        <div className="temp">
          <p>Search and/or enrollment</p>
        </div>

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
            <p>Name, Overall score, Active members, Total members</p>
            <p>Link to see all</p>
          </div>
        </div>

        <div className="temp">
          <p>Preview of next event (if applicable)</p>
        </div>

        <div className="temp">
          <p>Summary of most recent past event</p>
        </div>
      </PageContainer>
    )
  }
}

export default IndexPage

export const data = {
  layout: 'content'
}
