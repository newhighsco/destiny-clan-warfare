import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Lockup from '@components/Lockup'

export default {
  title: 'Components/Lockup',
  component: Lockup
} as ComponentMeta<typeof Lockup>

const Template: ComponentStory<typeof Lockup> = args => <Lockup {...args} />

export const source = Template.bind({})

source.args = {
  heading: 'Heading',
  kicker: 'Kicker',
  children: 'Content'
}
source.parameters = {
  chromatic: { disable: true }
}

export const heading = Template.bind({})

heading.args = {
  heading: 'Avalanche UK',
  headingAttributes: { href: '#' }
}

export const kicker = Template.bind({})

kicker.args = {
  kicker: 'Hardcore Casuals / Laidback Diehards',
  kickerAttributes: { href: '#' }
}

export const both = Template.bind({})

both.args = {
  ...heading.args,
  ...kicker.args
}

export const highlighted = Template.bind({})

highlighted.args = {
  ...both.args,
  highlight: true
}

export const reversed = Template.bind({})

reversed.args = {
  ...both.args,
  reverse: true
}

export const centerAligned = Template.bind({})

centerAligned.args = {
  ...both.args,
  align: 'center'
}

export const rightAligned = Template.bind({})

rightAligned.args = {
  ...both.args,
  align: 'right'
}

export const borderless = Template.bind({})

borderless.args = {
  ...both.args,
  border: false
}
