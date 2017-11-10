import React, { Component } from 'react'
import Link from 'gatsby-link'
import PageContainer from '../components/page-container/PageContainer'
import Lockup from '../components/lockup/Lockup'

class IndexPage extends Component {
  render () {
    return (
      <PageContainer>
        <Lockup kicker="Beta site" heading="Pages" />
        <ul>
          <li>
            <Link to="/clans">Clans</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>
        </ul>
      </PageContainer>
    )
  }
}

export default IndexPage

export const data = {
  layout: 'content'
}
