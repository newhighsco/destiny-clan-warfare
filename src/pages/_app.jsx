import React from 'react'
import { func, object } from 'prop-types'
import { SiteContainer, ThemeProvider } from '@newhighsco/chipset'
import theme from '@components/theme'

import '@styles/app.scss'

const AppPage = ({ Component, pageProps }) => (
  <ThemeProvider themes={theme}>
    <SiteContainer>
      <Component {...pageProps} />
    </SiteContainer>
  </ThemeProvider>
)

AppPage.propTypes = {
  Component: func,
  pageProps: object
}

export default AppPage
