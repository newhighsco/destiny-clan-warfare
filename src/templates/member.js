import React, { Component } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import Member from '../components/member/Member'
import NotFoundPage from '../pages/404'

const urlBuilder = require('../utils/url-builder')

class MemberTemplate extends Component {
  constructor (props) {
    super()

    const { location: { state } } = props

    this.state = {
      member: state ? state.member : null
    }
  }

  componentDidMount () {
    const { member } = this.state

    if (!member) {
      const { match } = this.props
      const memberId = match.params.member

      prefetch(urlBuilder.profileRootUrl)
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
      <Member member={member} />
    )
  }
}

MemberTemplate.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
}

export default MemberTemplate
