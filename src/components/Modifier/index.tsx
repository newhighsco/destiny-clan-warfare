import React from 'react'
import PropTypes from 'prop-types'
import { paramCase } from 'param-case'
import { List, Tooltip } from '@newhighsco/chipset'

import styles from './Modifier.module.scss'
import Icon from '@components/Icon'
import { duplicates } from './icons'

const PREFIX_MULTIPLY = 'x'
const PREFIX_NOT_APPLICABLE = 'N/A'
const PREFIX_PERCENTAGE = '%'
const PREFIX_POSITIVE = '+'
const NAMES_NOT_APPLICABLE = ['No Modifier', 'No Multiplier']
const NAMES_TBC = ['Modifier TBC', 'Multiplier TBC']

export interface ModifierProps {
  name: string
  multiplierBonus?: number
  multiplierModifier?: boolean
  scoringBonus?: number
  scoringModifier?: boolean
  description?: string
  createdBy?: string
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
  let key = paramCase(name || '')

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

  const label = [prefix, bonus, suffix].join('')

  return (
    <Tooltip
      toggle={
        <div className={styles.root} data-icon={key}>
          {key && (
            <Icon
              name={`modifier/${duplicates[key] || key}`}
              theme={{ root: styles.icon }}
            />
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
  modifiers: Array<ModifierProps>
  tooltipProps?: ModifierProps['tooltipProps']
}

const ModifierList: React.FC<ModifierListProps> = ({
  modifiers,
  tooltipProps
}) => {
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
