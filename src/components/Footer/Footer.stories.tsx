import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Footer from '@components/Footer'

export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = args => <Footer {...args} />

export const source = Template.bind({})

source.parameters = {
  chromatic: { disable: true }
}

export const example = Template.bind({})

example.storyName = ' '
