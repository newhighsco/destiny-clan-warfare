import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import { MedalList } from '../components/medal/Medal'
import Button from '../components/button/Button'

class MemberTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{`${data.member.name} | Members`}</title>
        </Helmet>
        <Card cutout className="text-center">
          {data.member.icon &&
            <Avatar className="card__avatar" icon={data.member.icon} />
          }
          <Lockup center reverse kicker={data.member.clan.name} heading={data.member.name} />
          <Button key="button" href={`https://www.bungie.net/en/Profile/${data.member.id}`} target="_blank">View profile</Button>
          <MedalList key="medals" medals={[ { tier: 1, description: 'TBC' }, { tier: 2, description: 'TBC' }, { tier: 3, description: 'TBC' } ]} />
        </Card>
        <Leaderboard cutout data={[ data.member.totals ]} />
      </PageContainer>
    )
  }
}

MemberTemplate.propTypes = {
  data: PropTypes.object
}

export default MemberTemplate

export const pageQuery = graphql`
  query MemberTemplateQuery($id: String!) {
    member(id: { eq: $id }) {
      id
      name
      icon
      clan {
        name
      }
      totals {
        wins
        kills
        deaths
        assists
        score
        lastPlayed
      }
    }
  }
`
