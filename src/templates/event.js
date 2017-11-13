import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'

class EventTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{data.event.name}</title>
        </Helmet>
        <Card className="text-center">
          <Lockup className="text-center" kicker={data.event.type} heading={data.event.name} />
          <p>{JSON.stringify(data.event)}</p>
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
      type
      description
      startDate
      endDate
    }
  }
`
