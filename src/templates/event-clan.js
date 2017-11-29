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

class EventClanTemplate extends Component {
  render () {
    const { data } = this.props
    const leaderboard = data.clan.leaderboard.filter(({ games }) => games > 0)

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.clan.name} | Current event`}</title>
        </Helmet>
        <Lockup center kicker="Current event" kickerHref={urlBuilder.eventUrl(data.clan.currentEventId)}>
          <RelativeDate label={constants.relativeDate.updated} date={data.clan.updatedDate} />
        </Lockup>
        <Card cutout className="text-center">
          <Avatar className="card__avatar" color={data.clan.color} foreground={data.clan.foreground} background={data.clan.background} />
          <Lockup center reverse kicker={data.clan.motto} heading={data.clan.name} />
          <div className="temp">
            <p>"Top player" block to show who has played most matches etc.</p>
          </div>
        </Card>
        <Leaderboard cutout data={leaderboard} sortBy="score" descending />
      </PageContainer>
    )
  }
}

EventClanTemplate.propTypes = {
  data: PropTypes.object
}

export default EventClanTemplate

export const pageQuery = graphql`
  query EventClanTemplateQuery($id: String!) {
    clan(id: { eq: $id }) {
      id
      updatedDate
      currentEventId
      name
      motto
      color
      foreground {
        color
        icon
      }
      background {
        color
        icon
      }
      leaderboard {
        id
        path
        name
        icon
        games
        wins
        kills
        deaths
        assists
        score
      }
    }
  }
`
