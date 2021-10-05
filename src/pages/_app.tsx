import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { AppPage } from '@newhighsco/press-start'
import config from '@config'
import theme from '@theme'

import '@styles/app.scss'

const meta = {
  additionalLinkTags: ['montserrat'].map(font => ({
    rel: 'preload',
    href: `/fonts/${font}.woff2`,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  }))
}

const App: React.FC<AppProps> = props => (
  <Provider session={props.pageProps.session}>
    <AppPage {...props} theme={theme} config={config} meta={meta} />
  </Provider>
)

export default App
