import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Avatar from '../components/avatar/Avatar'
import Lockup from '../components/lockup/Lockup'

class MemberTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{data.member.name}</title>
        </Helmet>
        <Card className="text-center">
          <Avatar className="card__avatar" icon={data.member.icon} />
          <Lockup className="text-center" kicker={data.clan.name} kickerHref={data.clan.path} heading={data.member.name} />
          <p>Stats, medals, etc. to go here</p>
        </Card>
      </PageContainer>
    )
  }
}

MemberTemplate.propTypes = {
  data: PropTypes.object
}

export default MemberTemplate

export const pageQuery = graphql`
  query memberTemplateQuery($id: String!, $clanId: String!) {
    member(id: { eq: $id }) {
      name
      icon
    }
    clan(id: { eq: $clanId }) {
      path
      name
    }
  }
`
