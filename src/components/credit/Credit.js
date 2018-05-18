import React, { PureComponent } from 'react'
import Icon from '../icon/Icon'
import AvalancheUkSvg from '../../images/avalanche-uk.svg'
import styles from './Credit.styl'

const baseClassName = 'credit'

const Credit = class extends PureComponent {
  render () {
    return (
      <div className={styles[baseClassName]}>
        <a className={styles[`${baseClassName}__link`]} href="https://avaclanche.uk" target="_blank" rel="noopener noreferrer">
          <Icon className={styles[`${baseClassName}__icon`]}>
            <AvalancheUkSvg />
          </Icon>
          <div className={styles[`${baseClassName}__details`]}>
            <small>Proudly brought to you by</small>
            <br />
            <small>the Guardians at Avalanche UK</small>
          </div>
        </a>
      </div>
    )
  }
}

export default Credit
