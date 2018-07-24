import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { MedalList } from './Medal'

const proxy = require('../../utils/api-helper').proxy()
const medalBuilder = require('../../utils/medal-builder')
const constants = require('../../utils/constants')

class Loader extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      medals: []
    }
  }

  componentDidMount () {
    proxy(this.props.url)
      .then(({ data }) => {
        this.setState({ ...medalBuilder.parseMedals(data, this.props.type) })
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
