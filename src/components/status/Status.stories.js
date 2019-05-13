import React from 'react'
import { storiesOf } from '@storybook/react'
import Status from './Status'

storiesOf('Status', module).add('Offline', () => <Status active />)
