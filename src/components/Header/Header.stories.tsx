import React from 'react'
import { ComponentStory, ComponentMeta, DecoratorFn } from '@storybook/react'
import { Provider } from 'next-auth/client'
import Header from '@components/Header'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = args => <Header {...args} />

export const Source = Template.bind({})

Source.parameters = {
  chromatic: { disable: true }
}

export const WithNoUser = Template.bind({})

export const WithUser = Template.bind({})

WithUser.decorators = [
  (Story => (
    <Provider
      session={{
        user: {
          name: 'benedfit',
          image: 'https://www.bungie.net/img/profile/avatars/cc13.jpg'
        }
      }}
    >
      {Story()}
    </Provider>
  )) as DecoratorFn
]
