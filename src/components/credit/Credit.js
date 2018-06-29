import React, { PureComponent } from 'react'
import Icon from '../icon/Icon'
import CreditSvg from './new-high-score.svg'
import styles from './Credit.styl'

const baseClassName = 'credit'

const Credit = class extends PureComponent {
  render () {
    return (
      <div className={styles[baseClassName]}>
        <a className={styles[`${baseClassName}__link`]} href="https://newhighsco.re" target="_blank" rel="noopener noreferrer" title="New High Score - Extending your favourite end-game">
          <Icon className={styles[`${baseClassName}__icon`]} a11yText="New High Score">
            <CreditSvg />
          </Icon>
          <div className={styles[`${baseClassName}__details`]}>
            <small>Proudly brought to you by</small>
            <br />
            <small>New High Score</small>
          </div>
        </a>
      </div>
    )
  }
}

export default Credit
