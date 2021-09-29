import React from 'react'
import type { AppProps } from 'next/app'
import { SiteContainer, ThemeProvider } from '@newhighsco/chipset'
import theme from '@components/theme'

import '@styles/app.scss'

const AppPage: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider themes={theme}>
    <SiteContainer>
      <Component {...pageProps} />
    </SiteContainer>
  </ThemeProvider>
)

export default AppPage
