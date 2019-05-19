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

const Loader = class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      medals: []
    }
  }

  componentDidMount() {
    const { type } = this.props

    proxy(this.props.url).then(({ data }) => {
      this.setState({
        loading: false,
        ...medalBuilder.parseMedals(data, type)
      })
    })
  }

  render() {
    const { children, type } = this.props
    const { loading, medals } = this.state

    if (loading) return <p>Loading {type.toLowerCase()} medals from API...</p>

    return children(medals)
  }
}

Loader.propTypes = {
  children: PropTypes.func,
  type: PropTypes.string,
  url: PropTypes.string
}

storiesOf('Medals', module)
  .add(
    'Clan',
    () => (
      <div className="storybook-tooltips-visible">
        <Loader type={constants.prefix.clan} url="Component/GetAllClanMedals">
          {medals => (
            <MedalList medals={medals} enableHover={false} tooltipActive />
          )}
        </Loader>
      </div>
    ),
    { percy: { skip: true } }
  )
  .add(
    'Member',
    () => (
      <div className="storybook-tooltips-visible">
        <Loader type={constants.prefix.profile} url="Component/GetAllMedals">
          {medals => (
            <MedalList medals={medals} enableHover={false} tooltipActive />
          )}
        </Loader>
      </div>
    ),
    { percy: { skip: true } }
  )
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
