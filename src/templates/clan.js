import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/PageContainer/PageContainer'
import Card from '../components/Card/Card'
import Lockup from '../components/Lockup/Lockup'

class ClanTemplate extends Component {
  render () {
    const { data } = this.props

    return (
      <PageContainer>
        <Helmet>
          <title>{data.clan.name}</title>
        </Helmet>
        <div className="content-center content-center--narrow">
          <Card>
            <Lockup kicker={data.clan.motto} heading={data.clan.name}>
              <p dangerouslySetInnerHTML={{ __html: data.clan.description }} />
            </Lockup>
          </Card>
        </div>
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
