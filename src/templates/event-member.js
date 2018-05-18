import React, { PureComponent } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import EventMember from '../components/member/EventMember'
import Loading from '../components/loading/Loading'

const urlBuilder = require('../utils/url-builder')

class EventMemberTemplate extends PureComponent {
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
        <Loading />
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
