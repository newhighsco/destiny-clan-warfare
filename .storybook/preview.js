import React from 'react'
import * as NextImage from 'next/image'
import { ThemeProvider } from '@newhighsco/chipset'
import componentTheme from '@theme'
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

const PureNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => (
    <PureNextImage
      {...props}
      unoptimized
      blurDataURL="data:image/svg+xml,<svg/>"
    />
  )
})
