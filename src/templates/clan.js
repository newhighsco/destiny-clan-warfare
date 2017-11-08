import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
// import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'

class ClanTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{data.clan.name}</title>
        </Helmet>
        <Card>
          {/* data.clan.icon &&
            <Avatar src={data.clan.icon} style={{ backgroundColor: data.clan.color }} />
          */}
          <Lockup kicker={data.clan.motto} heading={data.clan.name}>
            {data.clan.description &&
              <p dangerouslySetInnerHTML={{ __html: data.clan.description }} />
            }
          </Lockup>
        </Card>
        <Lockup kicker="Members" />
        <ul>
          {data.allMember.edges.map(({ node }) => (
            <li key={node.id}>
              <Link to={node.path}>{node.name}</Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    )
  }
}

ClanTemplate.propTypes = {
  data: PropTypes.object
}

export default ClanTemplate

export const pageQuery = graphql`
  query clanTemplateQuery($id: String!) {
    clan(id: { eq: $id }) {
      id
      name
      tag
      motto
      description
      color
      icon
    }
    allMember(filter: { clanId: { eq: $id } }, sort: { fields: [ name ] }) {
      edges {
        node {
          id
          path
          name
        }
      }
    }
  }
`
