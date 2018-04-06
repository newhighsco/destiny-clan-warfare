import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MultiSort from 'multi-sort'
import { storiesOf } from '@storybook/react'
import { ModifierList } from './Modifier'

const api = require('../../utils/api-helper').api
const camelcaseKeys = require('camelcase-keys')
const casingOptions = { deep: true }

class Loader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modifiers: []
    }
  }

  componentDidMount () {
    api(`Component/GetAllModifiers`)
      .then(({ data }) => {
        this.setState({ modifiers: camelcaseKeys(data, casingOptions) })
      })
  }

  render () {
    return this.props.children(this.state.modifiers)
  }
}

Loader.propTypes = {
  children: PropTypes.func
}

storiesOf('Modifiers', module)
  .addDecorator(story => (
    <div className="storybook-tooltips-visible">
      {story()}
    </div>
  ))
  .add('All', () => (
    <Loader>
      {modifiers => (
        <ModifierList modifiers={MultiSort(modifiers.map(modifier => ({ ...modifier, creator: modifier.createdBy, bonus: modifier.scoringBonus || modifier.multiplierBonus })), { name: 'ASC' })} enableHover={false} tooltipActive />
      )}
    </Loader>
  ))
