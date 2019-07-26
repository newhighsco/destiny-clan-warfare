import { addDecorator, addParameters, configure } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withTests } from '@storybook/addon-jest'
import { withConsole } from '@storybook/addon-console'
import withGutter from './decorators/gutter'
import inPercy from '@percy-io/in-percy'
import mockdate from 'mockdate'
import theme from './theme'

import '../src/stylus/index.styl'

import results from '../.jestcache.json'

if (inPercy()) {
  mockdate.set('October 21, 2015 04:19:00')
}

const req = require.context('../src', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {
    theme
  }
})

addDecorator(withA11y)
addDecorator(withTests({ results }))
addDecorator((storyFn, context) => withConsole()(storyFn)(context))
addDecorator(withGutter)

configure(loadStories, module)
