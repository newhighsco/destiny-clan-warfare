import React from 'react'
import type { AppProps } from 'next/app'
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
  <AppPage {...props} theme={theme} config={config} meta={meta} />
)

export default App
