import React, { Component } from 'react'
import Member from '../components/member/Member'

const constants = require('../utils/constants')
const urlBuilder = require('../utils/url-builder')

class MemberPage extends Component {
  render () {
    const member = {
      path: urlBuilder.profileUrl('@MEMBER_ID@'),
      id: '@MEMBER_ID@',
      name: '@MEMBER_NAME@',
      clanId: `${constants.prefix.hash}@CLAN_ID@`,
      clanName: '@CLAN_NAME@',
      clanTag: '@CLAN_TAG@'
    }

    return (
      <Member member={member} disallowRobots />
    )
  }
}

export default MemberPage
