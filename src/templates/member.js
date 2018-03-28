import React, { Component } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import Member from '../components/member/Member'
import NotFoundPage from '../pages/404'

const urlBuilder = require('../utils/url-builder')

class MemberTemplate extends Component {
  constructor (props) {
    super()

    this.state = {
      member: null
    }
  }

  async componentDidMount () {
    const { match } = this.props
    const memberId = match.params.member
    const data = await prefetch(urlBuilder.profileRootUrl)

    this.setState({
      member: data.data.allMember.find(({ id }) => id === memberId)
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
      <Member member={member} />
    )
  }
}

MemberTemplate.propTypes = {
  match: PropTypes.object
}

export default MemberTemplate
