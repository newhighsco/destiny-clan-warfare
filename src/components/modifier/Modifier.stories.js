import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { firstBy } from 'thenby'
import { storiesOf } from '@storybook/react'
import { ModifierList } from './Modifier'

const proxy = require('../../utils/api-helper').proxy()
const modifiers = [
  { name: '20/20' },
  { name: '20/20', bonus: 100 },
  { name: '20/20', bonus: 0 },
  { name: '20/20', bonus: 0.1 },
  { name: '20/20', bonus: 0, scoringModifier: true },
  { name: '20/20', bonus: 50, scoringModifier: true },
  { name: '20/20', bonus: -50, scoringModifier: true },
  { name: 'Nonexistent' },
  { name: 'Nonexistent', bonus: 100 },
  { name: 'Nonexistent', bonus: 0 },
  { name: 'Nonexistent', bonus: 0.1 },
  { name: 'Nonexistent', bonus: 0, scoringModifier: true },
  { name: 'Nonexistent', bonus: 50, scoringModifier: true },
  { name: 'Nonexistent', bonus: -50, scoringModifier: true },
  { name: 'Multiplier TBC', bonus: 0 },
  { name: 'Modifier TBC', bonus: 0, scoringModifier: true },
  { name: 'No Multiplier', bonus: 0 },
  { name: 'No Modifier', bonus: 0, scoringModifier: true }
]

const Loader = class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modifiers: []
    }
  }

  componentDidMount() {
    proxy(`Component/GetAllModifiers`).then(({ data }) => {
      const modifiers = data
        .map(
          ({
            name,
            description,
            createdBy,
            scoringModifier,
            scoringBonus,
            multiplierBonus
          }) => ({
            name,
            description,
            creator: createdBy,
            scoringModifier,
            bonus: scoringBonus || multiplierBonus
          })
        )
        .sort(firstBy('name'))

      this.setState({ modifiers })
    })
  }

  render() {
    return this.props.children(this.state.modifiers)
  }
}

Loader.propTypes = {
  children: PropTypes.func
}

storiesOf('Modifiers', module)
  .add(
    'All',
    () => (
      <div className="storybook-tooltips-visible">
        <Loader>
          {modifiers => (
            <ModifierList
              modifiers={modifiers}
              enableHover={false}
              tooltipActive
            />
          )}
        </Loader>
      </div>
    ),
    { percy: { skip: true } }
  )
  .add('Sizes', () => (
    <Fragment>
      <p>Regular</p>
      <ModifierList modifiers={modifiers} enableHover={false} />
      <p>Small</p>
      <ModifierList modifiers={modifiers} enableHover={false} size="small" />
    </Fragment>
  ))
