import React, { Component } from 'react'
import { withRouteData, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'

class MembersPage extends Component {
  render () {
    const { members } = this.props
    const title = 'Members'
    const description = 'All clan members waging war against other clans in Destiny 2'
    var currentClanId
    const leaderboard = members.filter(member => {
      if (member.clanId !== currentClanId) {
        currentClanId = member.clanId
        return true
      }

      return false
    }).map(member => ({
      name: member.clanName,
      path: member.clanPath,
      clanTag: member.clanTag,
      clanId: member.clanId
    }))

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Card cutout center>
          <Lockup primary center kicker="All" heading="Members" />
        </Card>
        <Leaderboard cutout data={leaderboard} prefetch={false} multiColumn />
      </PageContainer>
    )
  }
}

MembersPage.propTypes = {
  members: PropTypes.array
}

export default withRouteData(MembersPage)
