import React from 'react'
import type { AppProps } from 'next/app'
import { AppPage } from '@newhighsco/press-start'
import config from '@config'
import theme from '@theme'

import '@styles/app.scss'

const App: React.FC<AppProps> = props => (
  <AppPage {...props} theme={theme} config={config} />
)

export default App
