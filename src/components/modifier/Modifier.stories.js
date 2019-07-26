import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { firstBy } from 'thenby'
import { storiesOf } from '@storybook/react'
import { ModifierList } from './Modifier'
import withTooltips from '../../../.storybook/decorators/tooltips'

const constants = require('../../utils/constants')
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
  { name: constants.modifiers.tbc[1], bonus: 0 },
  { name: constants.modifiers.tbc[0], bonus: 0, scoringModifier: true },
  { name: constants.modifiers.notApplicable[1], bonus: 0 },
  {
    name: constants.modifiers.notApplicable[0],
    bonus: 0,
    scoringModifier: true
  }
]

const Loader = class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
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

      this.setState({ loading: false, modifiers })
    })
  }

  render() {
    const { children } = this.props
    const { loading, modifiers } = this.state

    if (loading) return <p>Loading modifiers from API...</p>

    return children(modifiers)
  }
}

Loader.propTypes = {
  children: PropTypes.func
}

const stories = storiesOf('Modifiers', module)

stories
  .addDecorator(withTooltips)
  .add(
    'All',
    () => (
      <Loader>
        {modifiers => (
          <ModifierList
            modifiers={modifiers}
            enableHover={false}
            tooltipActive
          />
        )}
      </Loader>
    ),
    { percy: { skip: true } }
  )

stories.add('Sizes', () => (
  <Fragment>
    <p>Regular</p>
    <ModifierList modifiers={modifiers} enableHover={false} />
    <p>Small</p>
    <ModifierList modifiers={modifiers} enableHover={false} size="small" />
  </Fragment>
))
