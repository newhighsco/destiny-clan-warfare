import React, { Component } from 'react'
import Member from '../components/member/Member'

class MemberPage extends Component {
  render () {
    const member = { name: '%NAME%', path: '%PATH%' }

    return (
      <Member member={member} />
    )
  }
}

export default MemberPage
