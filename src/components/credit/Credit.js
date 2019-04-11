import React, { PureComponent } from 'react'
import { OutboundLink } from 'react-ga-donottrack'
import Icon from '../icon/Icon'
import { ReactComponent as CreditSvg } from './new-high-score.svg'
import styles from './Credit.styl'

const baseClassName = 'credit'

const Credit = class extends PureComponent {
  render () {
    return (
      <div className={styles[baseClassName]}>
        <OutboundLink className={styles[`${baseClassName}__link`]} to="https://newhighsco.re" eventLabel="credit" target="_blank" title="New High Score - Extending your favourite end-game">
          <Icon className={styles[`${baseClassName}__icon`]} a11yText="New High Score">
            <CreditSvg />
          </Icon>
          <div className={styles[`${baseClassName}__details`]}>
            <small>Proudly brought to you by</small>
            <br />
            <small>New High Score</small>
          </div>
        </OutboundLink>
      </div>
    )
  }
}

export default Credit
