import '@babel/polyfill'
import React, { Component, Suspense } from 'react'
import { Root, Routes, Head, addPrefetchExcludes } from 'react-static'
import { Router } from '@reach/router'
import Analytics from './components/analytics/Analytics'
import MemberCurrent from './containers/member/Current'
import MemberOverall from './containers/member/Overall'
import Loading from './components/loading/Loading'
import appleTouchIcon from './images/apple-touch-icon.png'
import openGraphImage from './images/favicon-1200x1200.png'

import './stylus/index.styl'

const constants = require('./utils/constants')
const urlBuilder = require('./utils/url-builder')

const { title, name, description } = constants.meta

addPrefetchExcludes([
  new RegExp(urlBuilder.profileUrl('.*', '.*').substring(1), 'i'),
  new RegExp(urlBuilder.currentEventUrl('.*', '.*').substring(1), 'i')
])

class App extends Component {
  render () {
    return (
      <Root>
        <Analytics>
          <Head
            defaultTitle={title}
            titleTemplate={`%s | ${name}`}
          >
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <link rel="apple-touch-icon" href={appleTouchIcon} />
            <meta property="og:image" content={openGraphImage} />
          </Head>
          <Suspense fallback={<div className="site-container"><Loading /></div>}>
            <Router className="site-container">
              <MemberOverall path={urlBuilder.profileUrl(':clan', ':member')} />
              <MemberCurrent path={urlBuilder.currentEventUrl(':clan', ':member')} />
              <Routes default />
            </Router>
          </Suspense>
        </Analytics>
      </Root>
    )
  }
}

export default App
