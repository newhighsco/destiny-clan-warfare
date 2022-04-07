import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Card } from '@newhighsco/chipset'
import { WithBoth } from '@components/Lockup/Lockup.stories'

export default {
  title: 'Components/Card',
  component: Card
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = args => <Card {...args} />

export const Source = Template.bind({})

Source.args = {
  heading: 'Heading',
  children: 'Content'
}
Source.parameters = {
  chromatic: { disable: true }
}

export const WithHeading = Template.bind({})

WithHeading.args = {
  heading: <WithBoth {...WithBoth.args} align="center" reverse />,
  children: <p>Content</p>
}
