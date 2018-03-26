import React, { Component, Fragment } from 'react'
import { withRouteData, Link } from 'react-static'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Prose from '../components/prose/Prose'
import ClanTag from '../components/clan-tag/ClanTag'

class MembersPage extends Component {
  render () {
    const { data } = this.props
    const members = data.allMember
    const title = 'Members'
    const description = 'All clan members waging war against other clans in Destiny 2'
    var currentClanId
    var clanCount = 0

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
              {members.map(node => {
                var showDivider = false
                if (node.clanId !== currentClanId) {
                  currentClanId = node.clanId
                  showDivider = true
                  clanCount++
                }

                return (
                  <Fragment key={node.id}>
                    {showDivider &&
                      <li className="list-comma__divider" data-count={clanCount}>
                        <h2>
                          <ClanTag href={node.clanPath}>{node.clanTag}</ClanTag> <Link to={node.clanPath}>{node.clanName}</Link>
                        </h2>
                      </li>
                    }
                    <li>
                      <Link to={node.path} prefetch={false}>{node.name}</Link>
                    </li>
                  </Fragment>
                )
              })}
            </ul>
          </Prose>
        </Card>
      </PageContainer>
    )
  }
}

MembersPage.propTypes = {
  data: PropTypes.object
}

export default withRouteData(MembersPage)
