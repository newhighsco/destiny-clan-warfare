import React from 'react'
import Footer from '@components/Footer'

export default {
  title: 'Components/Footer',
  component: Footer
}

const Template = args => <Footer {...args} />

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
