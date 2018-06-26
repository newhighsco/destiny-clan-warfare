import React, { PureComponent } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import MemberCurrent from '../../components/member/Current'
import Loading from '../../components/loading/Loading'

const urlBuilder = require('../../utils/url-builder')

class MemberCurrentContainer extends PureComponent {
  constructor (props) {
    super(props)

    const { location: { state } } = this.props

    this.state = {
      clan: state ? state.clan : null,
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
        .then(({ clan, members }) => {
          this.setState({
            clan,
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
      <MemberCurrent {...this.state} />
    )
  }
}

MemberCurrentContainer.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
}

export default MemberCurrentContainer
