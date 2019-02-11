import React, { Fragment } from 'react'
import { Router } from '@reach/router'
import { configure, addDecorator, getStorybook, setAddon } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import createPercyAddon from '@percy-io/percy-storybook'
import inPercy from '@percy-io/in-percy'
import mockdate from 'mockdate'

import '../src/stylus/index.styl'
import './storybook.styl'

if (inPercy()) {
  mockdate.set('October 21, 2015 04:19:00');
}

const constants = require('../src/utils/constants')
const req = require.context('../src/components', true, /\.stories\.js$/)
const { percyAddon, serializeStories } = createPercyAddon()

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

setAddon(percyAddon)

configure(loadStories, module)

serializeStories(getStorybook)
