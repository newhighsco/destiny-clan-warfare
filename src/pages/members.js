import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import Member from '../components/member/Member'
import NotFoundPage from './404'

const urlBuilder = require('../utils/url-builder')

class MembersPage extends Component {
  render () {
    const { data, location } = this.props
    const leaderboard = data.allMember.edges.map(edge => edge.node)
    const columns = [
      'id',
      'path',
      'name',
      'icon',
      'tags',
      'clanId',
      'clanTag'
    ]
    const title = 'Members'
    const description = 'All clan members waging war against other clans in Destiny 2'

    return (
      <Switch>
        <Route
          exact
          path={urlBuilder.profileRootUrl}
          render={props => {
            return (
              <PageContainer>
                <Helmet>
                  <title>{title}</title>
                  <meta name="description" content={description} />
                  <meta property="og:title" content={title} />
                  <meta property="og:description" content={description} />
                </Helmet>
                <Card cutout center>
                  <Lockup primary center kicker="All" heading="Members" />
                </Card>
                <Leaderboard cutout data={leaderboard} columns={columns} />
              </PageContainer>
            )
          }}
        />
        <Route
          location={location}
          path={urlBuilder.profileUrl(':profile')}
          render={props => {
            const { match } = props
            const member = data.allMember.edges.find(({ node }) => node.id === match.params.profile)

            if (!member) {
              return (
                <NotFoundPage />
              )
            }

            return (
              <Member member={member ? member.node : null} />
            )
          }}
        />
        <Route component={NotFoundPage} status={404} />
      </Switch>
    )
  }
}

MembersPage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object
}

export default MembersPage

export const pageQuery = graphql`
  query MembersPageQuery {
    allMember(sort: { fields: [ clanSortable, nameSortable ] }, filter: { totalsVisible: { eq: true } }) {
      edges {
        node {
          path
          id
          name
          clanId
          clanName
          clanTag
          icon
          tags {
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
          ...memberMedalsFragment
        }
      }
    }
  }
`
