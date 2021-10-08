import React from 'react'
import Footer from '@components/Footer'

export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

const Template = args => <Footer {...args} />

export const source = Template.bind({})

source.parameters = {
  chromatic: { disable: true }
}

export const example = Template.bind({})

example.storyName = ' '
