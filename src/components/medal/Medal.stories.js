import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { MedalList } from './Medal'

const camelcaseKeys = require('camelcase-keys')
const api = require('../../utils/api-helper').api
const medalBuilder = require('../../utils/medal-builder')
const constants = require('../../utils/constants')

class Loader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      medals: []
    }
  }

  componentDidMount () {
    const casingOptions = { deep: true }

    api(this.props.url)
      .then(({ data }) => {
        this.setState({ medals: medalBuilder.parseMedals(camelcaseKeys(data, casingOptions), this.props.type) })
      })
  }

  render () {
    return this.props.children(this.state.medals)
  }
}

Loader.propTypes = {
  children: PropTypes.func,
  type: PropTypes.string,
  url: PropTypes.string
}

storiesOf('Medals', module)
  .addDecorator(story => (
    <div style={{ margin: '120px 100px' }}>
      {story()}
    </div>
  ))
  .add('Clan', () => (
    <Loader type={constants.prefix.clan} url="Component/GetAllClanMedals">
      {medals => <MedalList center medals={medals} />}
    </Loader>
  ))
  .add('Members', () => (
    <Loader type={constants.prefix.profile} url="Component/GetAllMedals">
      {medals => <MedalList center medals={medals} />}
    </Loader>
  ))
