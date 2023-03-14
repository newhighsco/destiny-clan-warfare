import '~styles/app.scss'

import { AppPage } from '@newhighsco/press-start'
import type { AppProps } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import config from '~config'
import theme from '~theme'

const meta = {
  additionalLinkTags: ['montserrat'].map(font => ({
    rel: 'preload',
    href: `/fonts/${font}.woff2`,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  }))
}

const App: React.FC<AppProps<{ session: Session }>> = props => (
  <SessionProvider session={props.pageProps.session}>
    <AppPage {...props} theme={theme} config={config} meta={meta} />
  </SessionProvider>
)

export default App
