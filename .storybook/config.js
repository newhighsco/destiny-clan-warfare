import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withTests } from '@storybook/addon-jest'
import inPercy from '@percy-io/in-percy'
import mockdate from 'mockdate'
import theme from './theme'

import '../src/stylus/index.styl'
import './storybook.styl'

import results from '../.jestcache.json'

if (inPercy()) {
  mockdate.set('October 21, 2015 04:19:00')
}

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

const PreviewContainer = ({ story }) => (
  <div className="storybook-preview-container">{story()}</div>
)

PreviewContainer.propTypes = {
  story: PropTypes.func
}

addParameters({
  options: {
    theme
  }
})

addDecorator(withA11y)

addDecorator(withTests({ results }))

addDecorator(story => (
  <Router>
    <PreviewContainer default story={story} />
  </Router>
))

configure(loadStories, module)
