import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import RelativeDate from '../components/relative-date/RelativeDate'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

class EventMemberTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | Current event`}</title>
        </Helmet>
        <Lockup center kicker="Current event" kickerHref={data.event.path}>
          <RelativeDate label={constants.relativeDate.updated} date={data.event.updatedDate} />
        </Lockup>
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <Lockup center reverse kicker={data.clan.name} kickerHref={urlBuilder.eventUrl(data.event.path, data.clan.id)} heading={data.member.name} />
          <div className="temp">
            <p>Event totals</p>
          </div>
        </Card>
        <Leaderboard cutout data={data.member.history} />
      </PageContainer>
    )
  }
}

EventMemberTemplate.propTypes = {
  data: PropTypes.object
}

export default EventMemberTemplate

export const pageQuery = graphql`
  query EventMemberTemplateQuery($id: String!, $clanId: String!, $eventId: String!) {
    member(id: { eq: $id }) {
      name
      icon
      history {
        game {
          path
          isExternal
          result
          type
          map
          mapSeparator
          date
        }
        kills
        deaths
        assists
        score
      }
    }
    clan(id: { eq: $clanId }) {
      id
      name
    }
    event(id: { eq: $eventId }) {
      updatedDate
      path
    }
  }
`
