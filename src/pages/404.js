import React from 'react'
import Helmet from 'react-helmet'
import Logo from '../components/Logo/Logo'

const NotFoundPage = () => (
  <div>
    <Helmet
      meta={[
        { name: 'robots', content: 'noindex,nofollow' }
      ]}
    />
    <Logo />
  </div>
)

export default NotFoundPage
