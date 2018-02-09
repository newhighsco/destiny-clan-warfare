import React, { Component } from 'react'
import EventMember from '../components/member/EventMember'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

class EventMemberPage extends Component {
  render () {
    const member = {
      path: urlBuilder.profileUrl('%MEMBER_ID%'),
      id: '%MEMBER_ID%',
      name: '%MEMBER_NAME%',
      clanId: `${constants.prefix.hash}%CLAN_ID%`,
      clanName: '%CLAN_NAME%',
      currentEventId: '%EVENT_ID%'
    }

    return (
      <EventMember member={member} disallowRobots />
    )
  }
}

export default EventMemberPage
