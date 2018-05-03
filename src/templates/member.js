import React, { Component } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import Member from '../components/member/Member'
import Loading from '../components/loading/Loading'

const urlBuilder = require('../utils/url-builder')

class MemberTemplate extends Component {
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
        <Loading />
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
