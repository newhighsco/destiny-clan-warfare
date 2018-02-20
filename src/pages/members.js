import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Prose from '../components/prose/Prose'
import ClanTag from '../components/clan-tag/ClanTag'
import Member from '../components/member/Member'
import NotFoundPage from './404'

const urlBuilder = require('../utils/url-builder')

class MembersPage extends Component {
  render () {
    const { data, location } = this.props
    const title = 'Members'
    const description = 'All clan members waging war against other clans in Destiny 2'
    const members = data.allMember.edges
    var currentClanId

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
                <Card>
                  <Lockup primary center kicker="All" heading="Members" />
                  <Prose>
                    <ul className="list--unstyled list--comma">
                      {members.map(({ node }) => {
                        var showDivider = false
                        if (node.clanId !== currentClanId) {
                          currentClanId = node.clanId
                          showDivider = true
                        }

                        return (
                          <Fragment key={node.id}>
                            {showDivider &&
                              <li className="list-comma__divider">
                                <h2>
                                  <ClanTag href={node.clanPath}>{node.clanTag}</ClanTag> <Link to={node.clanPath}>{node.clanName}</Link>
                                </h2>
                              </li>
                            }
                            <li>
                              <Link to={node.path}>{node.name}</Link>
                            </li>
                          </Fragment>
                        )
                      })}
                    </ul>
                  </Prose>
                </Card>
              </PageContainer>
            )
          }}
        />
        <Route
          location={location}
          path={urlBuilder.profileUrl(':profile')}
          render={props => {
            const { match } = props
            const member = members.find(({ node }) => node.id === match.params.profile)

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
          clanPath
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
