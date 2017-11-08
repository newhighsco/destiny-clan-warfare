import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import Lockup from '../components/lockup/Lockup'

class MemberTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{data.member.name}</title>
        </Helmet>
        <Card>
          <Lockup href={data.clan.path} kicker={data.clan.name} />
          <br />
          <Lockup heading={data.member.name} />
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
    }
    clan(id: { eq: $clanId }) {
      path
      name
    }
  }
`
