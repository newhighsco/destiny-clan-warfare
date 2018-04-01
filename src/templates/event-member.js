import React, { Component } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import EventMember from '../components/member/EventMember'
import NotFoundPage from '../pages/404'

const urlBuilder = require('../utils/url-builder')

class EventMemberTemplate extends Component {
  constructor (props) {
    super()

    this.state = {
      member: null
    }
  }

  componentDidMount () {
    const { match } = this.props
    const clanId = match.params.clan
    const memberId = match.params.member

    prefetch(urlBuilder.clanUrl(clanId))
      .then(({ data }) => {
        this.setState({
          member: data.allMember.find(({ id }) => id === memberId)
        })
      })
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
  match: PropTypes.object
}

export default EventMemberTemplate
