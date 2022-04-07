import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Lockup from '@components/Lockup'

export default {
  title: 'Components/Lockup',
  component: Lockup
} as ComponentMeta<typeof Lockup>

const Template: ComponentStory<typeof Lockup> = args => <Lockup {...args} />

export const Source = Template.bind({})

Source.args = {
  heading: 'Heading',
  kicker: 'Kicker',
  children: 'Content'
}
Source.parameters = {
  chromatic: { disable: true }
}

export const WithHeading = Template.bind({})

WithHeading.args = {
  heading: 'Avalanche UK',
  headingAttributes: { href: '#' }
}

export const WithKicker = Template.bind({})

WithKicker.args = {
  kicker: 'Hardcore Casuals / Laidback Diehards',
  kickerAttributes: { href: '#' }
}

export const WithBoth = Template.bind({})

WithBoth.args = {
  ...WithHeading.args,
  ...WithKicker.args
}

export const Highlighted = Template.bind({})

Highlighted.args = {
  ...WithBoth.args,
  highlight: true
}

export const Reversed = Template.bind({})

Reversed.args = {
  ...WithBoth.args,
  reverse: true
}

export const CenterAligned = Template.bind({})

CenterAligned.args = {
  ...WithBoth.args,
  align: 'center'
}

export const RightAligned = Template.bind({})

RightAligned.args = {
  ...WithBoth.args,
  align: 'right'
}

export const WithoutBorders = Template.bind({})

WithoutBorders.args = {
  ...WithBoth.args,
  border: false
}
