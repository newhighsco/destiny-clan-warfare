import React from 'react'
import classNames from 'classnames'
import { shortNumber } from '@helpers/stats'

import styles from './Stat.module.scss'

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

export default Stat
