import React from 'react'
import { Provider } from 'next-auth/client'
import Header from '@components/Header'
import { member } from '@fixtures/members'

export default {
  component: Header,
  parameters: { backgrounds: { default: 'dark' } }
}

export const Source = { parameters: { chromatic: { disable: true } } }

export const WithNoUser = {}

export const WithUser = {
  decorators: [
    Story => (
      <Provider session={{ user: member }}>
        <Story />
      </Provider>
    )
  ]
}
