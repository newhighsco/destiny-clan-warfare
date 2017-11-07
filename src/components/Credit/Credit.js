import React from 'react'
import AvalancheUkSvg from '../../images/avalanche-uk.svg'

const Credit = () => (
  <div className="credit">
    <a className="credit__link" href="https://avaclanche.uk" target="_blank" rel="noopener">
      <AvalancheUkSvg className="credit__logo" />
      <div className="credit__details">
        <small>Proudly brought to you by</small>
        <br />
        <small>the Guardians at Avalanche UK</small>
      </div>
    </a>
  </div>
)

export default Credit
