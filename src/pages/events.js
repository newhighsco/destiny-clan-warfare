import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Leaderboard from '../components/leaderboard/Leaderboard'
import EventMember from '../components/member/EventMember'
import NotFoundPage from './404'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

class EventsPage extends Component {
  render () {
    const { data, location } = this.props
    const leaderboard = data.allEvent.edges.map(edge => {
      const typeSuffix = edge.node.isCurrent ? constants.kicker.current : (edge.node.isPast ? '' : constants.kicker.future)
      return {
        game: {
          path: edge.node.path,
          type: `${edge.node.name}${typeSuffix.length > 0 ? ` - ${typeSuffix}` : ''}`,
          map: edge.node.isCurrent ? constants.relativeDate.current : (edge.node.isPast ? constants.relativeDate.past : constants.relativeDate.future),
          mapSeparator: ' ',
          date: edge.node.isCurrent ? edge.node.endDate : (edge.node.isPast) ? edge.node.endDate : edge.node.startDate
        },
        modifiers: edge.node.modifiers
      }
    })
    const currentEvent = data.allEvent.edges.find(({ node }) => node.isCurrent)
    const title = 'Events'
    const description = `All ${constants.meta.name} events to date`

    return (
      <Switch>
        <Route
          exact
          path={urlBuilder.eventRootUrl}
          render={() => (
            <PageContainer status={data.apiStatus}>
              <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
              </Helmet>
              <Card cutout center>
                <Lockup primary center kicker="All" heading="Events" />
              </Card>
              <Leaderboard cutout data={leaderboard} />
            </PageContainer>
          )}
        />
        {currentEvent &&
          <Route
            location={location}
            path={urlBuilder.eventUrl(currentEvent.node.path, ':clan/:profile')}
            render={props => {
              const { match } = props
              const member = data.allMember.edges.find(({ node }) => node.id === match.params.profile)

              if (!member) {
                return (
                  <NotFoundPage />
                )
              }

              return (
                <EventMember member={member ? member.node : null} status={data.apiStatus} />
              )
            }}
          />
        }
        <Route
          location={location}
          path={urlBuilder.eventUrl(':event', ':clan', ':profile')}
          render={props => {
            const { match } = props
            const url = urlBuilder.profileUrl(match.params.profile, match.params.event)

            return (
              <Redirect to={url} />
            )
          }}
        />
        <Route
          location={location}
          path={urlBuilder.eventUrl(':event', ':clan')}
          render={props => {
            const { match } = props
            const url = urlBuilder.clanUrl(match.params.clan, match.params.event)

            return (
              <Redirect to={url} />
            )
          }}
        />
        <Route component={NotFoundPage} status={404} />
      </Switch>
    )
  }
}

EventsPage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object
}

export default EventsPage

export const pageQuery = graphql`
  query EventsPageQuery {
    apiStatus {
      bungieCode
    }
    allEvent(sort: { fields: [ startDate ], order: DESC }, filter: { visible: { eq: true } }) {
      edges {
        node {
          path
          name
          startDate
          endDate
          isCurrent
          isPast
          ...modifiersFragment
        }
      }
    }
    allMember {
      edges {
        node {
          id
          updatedDate
          currentEventId
          name
          icon
          tags {
            name
          }
          clanId
          clanName
          leaderboard {
            games
            wins
            kills
            deaths
            assists
            bonuses {
              shortName
              count
            }
            score
          }
          history {
            game {
              path
              isExternal
              result
              type
              map
              mapSeparator
              date
            }
            kills
            deaths
            assists
            bonuses {
              shortName
              count
            }
            score
          }
        }
      }
    }
  }
`
