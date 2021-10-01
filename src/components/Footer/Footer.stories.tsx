import React from 'react'
import Footer from '@components/Footer'

import colors from '@styles/_colors.module.scss'

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
example.decorators = [
  Story => (
    <div style={{ background: colors.nero, color: colors.white }}>
      <Story />
    </div>
  )
]
