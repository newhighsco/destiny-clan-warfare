import React from 'react'
import Icon from '../icon/Icon'
import AvalancheUkSvg from '../../images/avalanche-uk.svg'

const Credit = () => (
  <div className="credit">
    <a className="credit__link" href="https://avaclanche.uk" target="_blank" rel="noopener noreferrer">
      <Icon className="credit__icon">
        <AvalancheUkSvg />
      </Icon>
      <div className="credit__details">
        <small>Proudly brought to you by</small>
        <br />
        <small>the Guardians at Avalanche UK</small>
      </div>
    </a>
  </div>
)

export default Credit
