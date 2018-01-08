import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

const constants = require('../utils/constants')

class EventsPage extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.allEvent.edges.map(edge => {
      const typeSuffix = edge.node.isCurrent ? constants.kicker.current : (edge.node.isPast ? '' : constants.kicker.future)
      return {
        game: {
          path: edge.node.path,
          type: `${edge.node.name}${typeSuffix.length > 0 ? ` - ${typeSuffix}` : ''}`,
          map: edge.node.isCurrent ? constants.relativeDate.current : (edge.node.isPast ? constants.relativeDate.past : constants.relativeDate.future),
          mapSeparator: ' ',
          date: edge.node.isCurrent ? edge.node.endDate : (edge.node.isPast) ? edge.node.endDate : edge.node.startDate
        },
        modifiers: edge.node.modifiers
      }
    })
    const title = 'Events'
    const description = `All ${constants.meta.name} events to date`

    return (
      <PageContainer status={data.apiStatus}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
        <Card cutout className="text-center">
          <Lockup primary center kicker="All" heading="Events" />
        </Card>
        <Leaderboard cutout data={leaderboard} />
      </PageContainer>
    )
  }
}

EventsPage.propTypes = {
  data: PropTypes.object
}

export default EventsPage

export const pageQuery = graphql`
  query EventsPageQuery {
    apiStatus {
      bungieCode
    }
    allEvent(sort: { fields: [ startDate ], order: DESC }, filter: { visible: { eq: true } }) {
      edges {
        node {
          path
          name
          startDate
          endDate
          isCurrent
          isPast
          ...modifiersFragment
        }
      }
    }
  }
`
