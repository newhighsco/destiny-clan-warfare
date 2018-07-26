import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { firstBy } from 'thenby'
import { storiesOf } from '@storybook/react'
import { ModifierList } from './Modifier'

const proxy = require('../../utils/api-helper').proxy()

class Loader extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      modifiers: []
    }
  }

  componentDidMount () {
    proxy(`Component/GetAllModifiers`)
      .then(({ data }) => {
        this.setState({ modifiers: data })
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
        <ModifierList modifiers={modifiers.map(modifier => ({
          name: modifier.Name,
          description: modifier.Description,
          creator: modifier.CreatedBy,
          scoringModifier: modifier.ScoringModifier,
          bonus: modifier.ScoringBonus || modifier.MultiplierBonus
        })).sort(firstBy('name'))} enableHover={false} tooltipActive />
      )}
    </Loader>
  ))
