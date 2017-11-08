import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
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
          <Lockup kicker={data.clan.motto} heading={data.clan.name}>
            <p dangerouslySetInnerHTML={{ __html: data.clan.description }} />
          </Lockup>
        </Card>
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
      groupId
      name
      tag
      motto
      description
    }
  }
`
