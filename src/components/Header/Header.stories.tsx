import React from 'react'
import { Provider } from 'next-auth/client'
import { member } from '@fixtures/members'
import Header from '.'

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
