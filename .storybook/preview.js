import React from 'react'
import { ThemeProvider } from '@newhighsco/chipset'
import componentTheme from '@components/theme'
import theme from './theme'

export const decorators = [
  Story => (
    <ThemeProvider themes={componentTheme}>
      <Story />
    </ThemeProvider>
  )
]

export const parameters = {
  docs: {
    theme
  }
}
