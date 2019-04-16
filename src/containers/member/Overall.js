import React, { useState, useEffect } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import MemberOverall from '../../components/member/Overall'
import Loading from '../../components/loading/Loading'
import NotFound from '../../components/not-found/NotFound'

const urlBuilder = require('../../utils/url-builder')

function MemberOverallContainer(props) {
  const {
    location: { state }
  } = props
  const [data, setData] = useState({
    clan: state ? state.clan : null,
    member: state ? state.member : null,
    notFound: false
  })

  useEffect(() => {
    if (!data.member) {
      const clanId = props.clan
      const memberId = props.member.replace(/#.+$/, '')

      prefetch(urlBuilder.clanUrl(clanId), { type: 'data' }).then(
        ({ clan, members }) => {
          const member = members.find(({ id }) => id === memberId)

          setData({
            clan,
            member,
            notFound: typeof member === 'undefined'
          })
        }
      )
    }
  })

  const { member, notFound } = data

  if (notFound) {
    return <NotFound />
  }

  if (!member) {
    return <Loading />
  }

  return <MemberOverall {...data} />
}

MemberOverallContainer.propTypes = {
  clan: PropTypes.string,
  member: PropTypes.string,
  location: PropTypes.object
}

export default MemberOverallContainer
