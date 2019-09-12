import React from 'react'
import PageThanks from '../components/page/thanks/Thanks'

function ThanksPage() {
  return (
    <PageThanks search={typeof location !== 'undefined' && location.search} />
  )
}

export default ThanksPage
