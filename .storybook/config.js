import React, { Fragment } from 'react'
import { Router } from '@reach/router'
import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

import '../src/stylus/index.styl'
import './storybook.styl'

const constants = require('../src/utils/constants')
const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

const PreviewContainer = ({ story }) => (
  <div className="storybook-preview-container">
    {story()}
  </div>
)

addDecorator(story => (
  <Router>
    <PreviewContainer default story={story} />
  </Router>
))

addDecorator(
  withOptions({
    name: constants.meta.name,
    url: '/',
    showAddonPanel: false
  })
)

configure(loadStories, module)
