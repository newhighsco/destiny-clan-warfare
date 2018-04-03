import React, { Component, Fragment } from 'react'
import { withRouteData, Link, Head } from 'react-static'
import PropTypes from 'prop-types'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Prose from '../components/prose/Prose'
import ClanTag from '../components/clan-tag/ClanTag'

class MembersPage extends Component {
  render () {
    const { members } = this.props
    const title = 'Members'
    const description = 'All clan members waging war against other clans in Destiny 2'
    var currentClanId

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Card>
          <Lockup primary center kicker="All" heading="Members" />
          <Prose>
            <ul className="list--unstyled list--comma">
              {members.map(node => {
                var showDivider = false
                if (node.clanId !== currentClanId) {
                  currentClanId = node.clanId
                  showDivider = true
                }

                return (
                  <Fragment key={node.id}>
                    {showDivider &&
                      <li>
                        <ClanTag href={node.clanPath}>{node.clanTag}</ClanTag> <Link to={node.clanPath} prefetch={false}>{node.clanName}</Link>
                      </li>
                    }
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
  members: PropTypes.array
}

export default withRouteData(MembersPage)
