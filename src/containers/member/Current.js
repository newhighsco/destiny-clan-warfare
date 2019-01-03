import React, { PureComponent } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import MemberCurrent from '../../components/member/Current'
import Loading from '../../components/loading/Loading'
import NotFound from '../../components/not-found/NotFound'

const urlBuilder = require('../../utils/url-builder')

class MemberCurrentContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { location: { state } } = this.props

    this.state = {
      apiStatus: null,
      clan: state ? state.clan : null,
      member: state ? state.member : null,
      notFound: false
    }
  }

  componentDidMount () {
    var { member } = this.state

    if (!member) {
      const clanId = this.props.clan
      const memberId = this.props.member.replace(/#.+$/, '')

      prefetch(urlBuilder.currentEventUrl(clanId))
        .then(({ apiStatus, clan, members, currentTotals, matchHistory, matchHistoryLimit }) => {
          member = members.find(({ id }) => id === memberId)
          member.currentTotals = currentTotals[memberId]
          member.matchHistory = matchHistory[memberId]

          this.setState({
            apiStatus,
            clan,
            member,
            matchHistoryLimit,
            notFound: typeof member === 'undefined'
          })
        })
    }
  }

  render () {
    const { member, notFound } = this.state

    if (notFound) {
      return (
        <NotFound />
      )
    }

    if (!member) {
      return (
        <Loading />
      )
    }

    return (
      <MemberCurrent {...this.state} />
    )
  }
}

MemberCurrentContainer.propTypes = {
  clan: PropTypes.string,
  member: PropTypes.string,
  location: PropTypes.object
}

export default MemberCurrentContainer
