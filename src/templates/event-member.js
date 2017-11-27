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

class EventMemberTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | Current event`}</title>
        </Helmet>
        <Lockup center kicker="Current event">
          <RelativeDate label={constants.relativeDate.updated} date={data.member.updatedDate} />
        </Lockup>
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <Lockup center reverse kicker={data.member.clan.name} heading={data.member.name} />
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
  query EventMemberTemplateQuery($id: String!) {
    member(id: { eq: $id }) {
      updatedDate
      name
      icon
      clanId
      clan {
        name
      }
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
  }
`
