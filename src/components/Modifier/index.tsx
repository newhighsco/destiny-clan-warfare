import { List, Tooltip } from '@newhighsco/chipset'
import { kebabCase } from 'change-case'
import type PropTypes from 'prop-types'
import React from 'react'

import Icon from '~components/Icon'
import { type Modifier as ModifierType } from '~libs/api/types'

import { duplicates } from './icons'
import styles from './Modifier.module.scss'

const PREFIX_MULTIPLY = 'x'
const PREFIX_NOT_APPLICABLE = 'N/A'
const PREFIX_PERCENTAGE = '%'
const PREFIX_POSITIVE = '+'
const NAMES_NOT_APPLICABLE = ['No Modifier', 'No Multiplier']
const NAMES_TBC = ['Modifier TBC', 'Multiplier TBC']

interface ModifierProps extends ModifierType {
  tooltipProps?: PropTypes.InferProps<Tooltip.propTypes>
}

const Modifier: React.FC<ModifierProps> = ({
  name,
  multiplierBonus,
  scoringBonus,
  scoringModifier,
  description,
  tooltipProps
}) => {
  let key = kebabCase(name || '')

  let bonus = scoringModifier ? scoringBonus : multiplierBonus
  let prefix = scoringModifier ? PREFIX_POSITIVE : PREFIX_MULTIPLY
  let suffix = ''

  if (!bonus || bonus <= 0) prefix = ''

  if (!scoringModifier && bonus < 1) {
    suffix = PREFIX_PERCENTAGE

    if (bonus === 0) {
      bonus = -100
    } else {
      prefix = ''
      bonus *= 100
    }
  }

  if (scoringModifier && bonus === 0) prefix = PREFIX_POSITIVE

  if (NAMES_TBC.includes(name)) {
    prefix = ''
    suffix = ''
    bonus = undefined
  }

  if (NAMES_NOT_APPLICABLE.includes(name)) {
    key = ''
    prefix = ''
    suffix = PREFIX_NOT_APPLICABLE
    bonus = undefined
  }

  const icon: string = duplicates[key] || key
  const label = [prefix, bonus, suffix].join('')

  return (
    <Tooltip
      toggle={
        <div className={styles.root} data-icon={key}>
          {icon && (
            <Icon name={`modifier/${icon}`} theme={{ root: styles.icon }} />
          )}
          {label && <div className={styles.label}>{label}</div>}
        </div>
      }
      heading={name}
      {...tooltipProps}
    >
      {description}
    </Tooltip>
  )
}

export interface ModifierListProps {
  modifiers: ModifierType[]
  tooltipProps?: PropTypes.InferProps<Tooltip.propTypes>
}

const ModifierList: React.FC<ModifierListProps> = ({
  modifiers,
  tooltipProps
}) => {
  if (!modifiers?.length) return null

  return (
    <List inline className={styles.list}>
      {modifiers.map((modifier, i) => (
        <li key={i}>
          <Modifier {...modifier} tooltipProps={tooltipProps} />
        </li>
      ))}
    </List>
  )
}

export { Modifier, ModifierList }
