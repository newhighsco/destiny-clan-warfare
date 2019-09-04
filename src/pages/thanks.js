import React from 'react'
import Thanks from '../components/thanks/Thanks'

function ThanksPage() {
  return <Thanks search={typeof location !== 'undefined' && location.search} />
}

export default ThanksPage
