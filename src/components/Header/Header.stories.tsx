import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { member } from '~fixtures/members'

import Header from '.'

export default {
  component: Header,
  decorators: [
    Story => (
      <SessionProvider>
        <Story />
      </SessionProvider>
    )
  ],
  parameters: { backgrounds: { default: 'dark' } }
}

export const Source = { parameters: { chromatic: { disable: true } } }

export const WithNoUser = {}

export const WithUser = {
  decorators: [
    Story => (
      <SessionProvider session={{ user: member, expires: '' }}>
        <Story />
      </SessionProvider>
    )
  ]
}
