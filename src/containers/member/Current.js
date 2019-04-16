import React, { useState, useEffect } from 'react'
import { prefetch } from 'react-static'
import PropTypes from 'prop-types'
import MemberCurrent from '../../components/member/Current'
import Loading from '../../components/loading/Loading'
import NotFound from '../../components/not-found/NotFound'

const urlBuilder = require('../../utils/url-builder')

function MemberCurrentContainer(props) {
  const {
    location: { state }
  } = props
  const [data, setData] = useState({
    apiStatus: null,
    clan: state ? state.clan : null,
    member: state ? state.member : null,
    notFound: false
  })

  useEffect(() => {
    if (!data.member) {
      const clanId = props.clan
      const memberId = props.member.replace(/#.+$/, '')

      prefetch(urlBuilder.currentEventUrl(clanId), { type: 'data' }).then(
        ({
          apiStatus,
          clan,
          members,
          currentTotals,
          matchHistory,
          matchHistoryLimit
        }) => {
          const member = members.find(({ id }) => id === memberId)

          if (member) {
            member.currentTotals = currentTotals[memberId]
            member.matchHistory = matchHistory[memberId]
          }

          setData({
            apiStatus,
            clan,
            member,
            matchHistoryLimit,
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

  return <MemberCurrent {...data} />
}

MemberCurrentContainer.propTypes = {
  clan: PropTypes.string,
  member: PropTypes.string,
  location: PropTypes.object
}

export default MemberCurrentContainer
