import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import { ModifierList } from '../components/modifier/Modifier'

const constants = require('../utils/constants')

class ModifiersPage extends Component {
  render () {
    const { data } = this.props
    const modifiers = data.allModifier.edges.map(edge => edge.node)
    const title = 'Modifiers'
    const description = `All ${constants.meta.name} modifiers`

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex,nofollow" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
        <Card cutout className="text-center">
          <Lockup primary center kicker="All" heading="Modifiers" />
          <ModifierList modifiers={modifiers} />
        </Card>
      </PageContainer>
    )
  }
}

ModifiersPage.propTypes = {
  data: PropTypes.object
}

export default ModifiersPage

export const data = {
  layout: 'content'
}

export const pageQuery = graphql`
  query ModifiersPageQuery {
    allModifier(sort: { fields: [ name ] }) {
      edges {
        node {
          name
          description
          scoringModifier
          scoringBonus
          multiplierModifier
          multiplierBonus
          creator {
            name
          }
        }
      }
    }
  }
`
