import React from 'react'
import HoldingPageContainer from './HoldingPageContainer'
import Lockup from '@components/Lockup'

const meta = {
  title: 'Loading...',
  description: 'Please be patient, this page is loading'
}

const LoadingPageContainer: React.FC = () => {
  return (
    <HoldingPageContainer meta={meta} showBackground={false}>
      <Lockup heading={meta.title} />
    </HoldingPageContainer>
  )
}

export default LoadingPageContainer
