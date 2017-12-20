import React from 'react'
import { setAddon, configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

import '../src/stylus/index.styl'
import './storybook.styl'

const constants = require('../src/utils/constants')

const req = require.context('../src/components', true, /\.stories\.js$/)
const loadStories = () => {
  req.keys().forEach((filename) => req(filename))
}

setOptions({
  name: constants.meta.name,
  url: '/',
  downPanelInRight: false
})

addDecorator(story => (
  <div className="storybook-preview-container">
    {story()}
  </div>
))

configure(loadStories, module)
