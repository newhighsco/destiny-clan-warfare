import React from 'react'
import Header from '@components/Header'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

const Template = args => <Header {...args} />

export const source = Template.bind({})

source.parameters = {
  chromatic: { disable: true }
}

export const withNoUser = Template.bind({})

export const withUser = Template.bind({})

withUser.args = {
  user: {
    name: 'benedfit',
    image: 'https://www.bungie.net/img/profile/avatars/cc13.jpg'
  }
}
