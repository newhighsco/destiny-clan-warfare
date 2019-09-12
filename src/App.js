import React, { Suspense } from 'react'
import { Root, Routes, Head, addPrefetchExcludes } from 'react-static'
import { Router, Match } from '@reach/router'
import Analytics from './components/analytics/Analytics'
import SiteContainer from './components/site-container/SiteContainer'
import MemberCurrentContainer from './containers/member/Current'
import MemberOverallContainer from './containers/member/Overall'
import Loading from './components/loading/Loading'

import './stylus/index.styl'
import { AppProvider } from './contexts/App'

const constants = require('./utils/constants')
const urlBuilder = require('./utils/url-builder')

const { title, name, description } = constants.meta

addPrefetchExcludes([
  new RegExp(urlBuilder.profileUrl('.*', '.*').replace(/\/(.*)\//, '$1'), 'i'),
  new RegExp(
    urlBuilder.currentEventUrl('.*', '.*').replace(/\/(.*)\//, '$1'),
    'i'
  )
])

function App() {
  return (
    <AppProvider>
      <Root>
        <Match path="*">
          {({ location }) => {
            if (typeof requestAnimationFrame !== 'undefined') {
              requestAnimationFrame(() => {
                const { hash } = location
                const target = hash
                  ? document.getElementById(
                      hash.replace(constants.prefix.hash, '')
                    )
                  : null

                if (target) {
                  target.scrollIntoView()
                } else {
                  window.scrollTo(0, 0)
                }
              })
            }
          }}
        </Match>
        <Analytics>
          <Head defaultTitle={title} titleTemplate={`%s | ${name}`}>
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <link
              rel="apple-touch-icon"
              href="/images/meta/apple-touch-icon.png"
            />
            <meta
              property="og:image"
              content={`${process.env.SITE_URL}/images/meta/sharing.png`}
            />
          </Head>

          <Suspense
            fallback={
              <SiteContainer>
                <Loading />
              </SiteContainer>
            }
          >
            <SiteContainer element={Router} primary={false}>
              <MemberOverallContainer
                path={urlBuilder.profileUrl(':clan', ':member')}
              />
              <MemberCurrentContainer
                path={urlBuilder.currentEventUrl(':clan', ':member')}
              />
              <Routes default />
            </SiteContainer>
          </Suspense>
        </Analytics>
      </Root>
    </AppProvider>
  )
}

export default App
