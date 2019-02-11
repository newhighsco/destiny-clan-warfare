import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { MedalList } from './Medal'

const proxy = require('../../utils/api-helper').proxy()
const medalBuilder = require('../../utils/medal-builder')
const constants = require('../../utils/constants')
const medals = [
  { name: 'Top 3 company', tier: 1, count: 1 },
  { name: 'Top 3 company', tier: 1, count: 5 },
  { name: 'First company', tier: 2, count: 1 },
  { name: 'First company', tier: 2, count: 5 },
  { name: 'The best of the best', tier: 3, count: 1 },
  { name: 'The best of the best', tier: 3, count: 5 },
  { name: 'Z Nonexistent', tier: 1, count: 5 },
  { name: 'Z Nonexistent', tier: 1, count: 1 }
]

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
  .addWithPercyOptions('Clan', { skip: true }, () => (
    <div className="storybook-tooltips-visible">
      <Loader type={constants.prefix.clan} url="Component/GetAllClanMedals">
        {medals => <MedalList medals={medals} enableHover={false} tooltipActive />}
      </Loader>
    </div>
  ))
  .addWithPercyOptions('Member', { skip: true }, () => (
    <div className="storybook-tooltips-visible">
      <Loader type={constants.prefix.profile} url="Component/GetAllMedals">
        {medals => <MedalList medals={medals} enableHover={false} tooltipActive />}
      </Loader>
    </div>
  ))
  .add('Sizes', () => (
    <Fragment>
      <p>Regular</p>
      <MedalList medals={medals} enableHover={false} />
      <p>Small</p>
      <MedalList medals={medals} enableHover={false} size="small" />
      <p>X-Small</p>
      <MedalList medals={medals} enableHover={false} size="x-small" />
    </Fragment>
  ))
