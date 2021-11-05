import React from 'react'
import classNames from 'classnames'
import { List } from '@newhighsco/chipset'
import { shortNumber } from '@helpers/stats'

import styles from './Stat.module.scss'
import Lockup from '@components/Lockup'

const BLANK = '-'

export interface StatProps {
  label: string
  value: string | number | { label: string; value: string | number }
  className?: string
}

const Stat: React.FC<StatProps> = ({ label, value, className }) => {
  let valueLabel

  if (typeof value === 'object') {
    valueLabel = value.label
    value = typeof value.value !== 'undefined' ? value.value : BLANK

    // TODO: Handle blanks
    // if (value <= 0) {
    //   value = BLANK
    //   valueLabel = undefined
    // }
  }

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{shortNumber(value)}</div>
      {valueLabel && <div className={styles.label}>{valueLabel}</div>}
    </div>
  )
}

export interface StatListProps {
  stats: Array<StatProps>
  kicker?: string
}

const StatList: React.FC<StatListProps> = ({ stats, kicker }) => {
  if (!stats) return null

  return (
    <>
      {kicker && (
        <Lockup
          kicker={kicker}
          border={false}
          align="center"
          className={styles.heading}
        />
      )}
      <List inline className={styles.list}>
        {stats.map((stat, i) => (
          <li key={i}>
            <Stat {...stat} />
          </li>
        ))}
      </List>
    </>
  )
}

export { Stat, StatList }
