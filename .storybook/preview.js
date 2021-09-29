import React from 'react'
import { ThemeProvider } from '@newhighsco/chipset'
import componentTheme from '@components/theme'
import theme from './theme'

import './preview.scss'

export const decorators = [
  Story => (
    <ThemeProvider themes={componentTheme}>
      <Story />
    </ThemeProvider>
  )
]

export const parameters = {
  darkMode: {
    current: theme.base,
    dark: theme,
    light: theme
  }
}
