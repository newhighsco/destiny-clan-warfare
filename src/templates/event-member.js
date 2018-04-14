import React, { Component } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import EventMember from '../components/member/EventMember'
import NotFoundPage from '../pages/404'

const urlBuilder = require('../utils/url-builder')

class EventMemberTemplate extends Component {
  constructor (props) {
    super(props)

    const { location: { state } } = this.props

    this.state = {
      member: state ? state.member : null
    }
  }

  componentDidMount () {
    const { member } = this.state

    if (!member) {
      const { match } = this.props
      const clanId = match.params.clan
      const memberId = match.params.member

      prefetch(urlBuilder.currentEventUrl(clanId))
        .then(({ members }) => {
          this.setState({
            member: members.find(({ id }) => id === memberId)
          })
        })
    }
  }

  render () {
    const { member } = this.state

    if (!member) {
      return (
        <NotFoundPage />
      )
    }

    return (
      <EventMember member={member} />
    )
  }
}

EventMemberTemplate.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
}

export default EventMemberTemplate
