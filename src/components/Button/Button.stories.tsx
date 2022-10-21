import React from 'react'
import { Button } from '@newhighsco/chipset'

export default { component: Button }

export const Source = {
  args: { href: 'https://example.com/', children: 'Content' },
  parameters: { chromatic: { disable: true } }
}

export const Group = {
  render: args => <Button.Group {...args} />,
  args: {
    children: [
      <Button key="default">Default</Button>,
      <Button key="active" href="https://example.com/" target="_blank" active>
        Active
      </Button>,
      <Button key="disabled" disabled>
        Disabled
      </Button>
    ]
  },
  name: ' '
}
