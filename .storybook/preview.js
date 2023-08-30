import './preview.scss'

import { ThemeProvider } from '@newhighsco/chipset'
import isChromatic from 'chromatic/isChromatic'
import MockDate from 'mockdate'
import React from 'react'

import componentTheme from '~theme'

import theme from './theme'

if (isChromatic) {
  MockDate.set(new Date('1971-06-15 12:30:00'))
}

export const decorators = [
  Story => (
    <ThemeProvider themes={componentTheme}>
      <Story />
    </ThemeProvider>
  )
]

export const parameters = {
  darkMode: {
    current: theme.base
  }
}
