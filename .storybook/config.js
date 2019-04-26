import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withInfo } from '@storybook/addon-info'
import inPercy from '@percy-io/in-percy'
import mockdate from 'mockdate'
import theme from './theme'

import '../src/stylus/index.styl'
import './storybook.styl'

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

addDecorator(
  withInfo({
    inline: false,
    styles: {
      button: {
        topRight: {
          borderRadius: '5px 0 0 0',
          bottom: 0,
          top: 'auto',
          zIndex: 99998,
          backgroundColor: '#1565c0'
        }
      },
      infoStory: {
        backgroundColor: 'rgb(255, 255, 255)',
        backgroundImage:
          'linear-gradient(to bottom, rgb(238, 238, 238) 0px, rgb(238, 238, 238) 1px, rgb(250, 250, 250) 1px, rgb(250, 250, 250) calc(100% - 1px), rgb(238, 238, 238) calc(100% - 1px), rgb(238, 238, 238) 100%)',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'calc(100% - 80px) 100%',
        padding: '20px 60px'
      },
      infoBody: {
        border: 0,
        margin: 0,
        paddingBottom: 20
      },
      infoContent: {
        counterReset: 'selector-hack--story-info-content'
      }
    }
  })
)

addDecorator(withA11y)

addDecorator(story => (
  <Router>
    <PreviewContainer default story={story} />
  </Router>
))

configure(loadStories, module)
