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

  componentDidMount () {
    const { match } = this.props
    const memberId = match.params.member

    prefetch(urlBuilder.profileRootUrl)
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
      <Member member={member} />
    )
  }
}

MemberTemplate.propTypes = {
  match: PropTypes.object
}

export default MemberTemplate
