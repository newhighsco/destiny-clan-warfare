import React from 'react'
import Header from '@components/Header'

import colors from '@styles/_colors.module.scss'

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
example.decorators = [
  Story => (
    <div style={{ background: colors.nero, color: colors.white }}>
      <Story />
    </div>
  )
]
