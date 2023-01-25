import { Card } from '@newhighsco/chipset'
import React from 'react'

import Lockup from '~components/Lockup'

export default { component: Card }

export const Source = {
  args: { heading: 'Heading', children: 'Content' },
  parameters: { chromatic: { disable: true } }
}

export const WithHeading = {
  args: { heading: <Lockup heading="Heading" />, children: <p>Content</p> }
}
