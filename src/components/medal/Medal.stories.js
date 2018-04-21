import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { MedalList } from './Medal'

const camelcaseKeys = require('camelcase-keys')
const api = require('../../utils/api-helper').api()
const medalBuilder = require('../../utils/medal-builder')
const constants = require('../../utils/constants')
const casingOptions = { deep: true }

class Loader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      medals: []
    }
  }

  componentDidMount () {
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
    <div className="storybook-tooltips-visible">
      {story()}
    </div>
  ))
  .add('Clan', () => (
    <Loader type={constants.prefix.clan} url="Component/GetAllClanMedals">
      {medals => <MedalList medals={medals} enableHover={false} tooltipActive />}
    </Loader>
  ))
  .add('Members', () => (
    <Loader type={constants.prefix.profile} url="Component/GetAllMedals">
      {medals => <MedalList medals={medals} enableHover={false} tooltipActive />}
    </Loader>
  ))
