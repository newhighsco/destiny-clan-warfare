import React from 'react'
import Header from '@components/Header'

export default {
  title: 'Components/Header',
  component: Header
}

const Template = args => <Header {...args} />

export const source = Template.bind({})

source.parameters = {
  chromatic: { disable: true }
}

export const example = Template.bind({})

example.storyName = ' '
example.parameters = {
  backgrounds: {
    default: 'dark'
  }
}
