import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Lockup } from '../lockup/Lockup'
import Logos from './logos'
import styles from './Sponsor.styl'

const pascalCase = require('pascal-case')

const baseClassName = 'sponsor'

class Sponsor extends PureComponent {
  render () {
    const { name } = this.props

    if (!name) return null

    const logoKey = pascalCase(name || '')
    const logo = Logos.hasOwnProperty(logoKey) ? Logos[logoKey] : null
    const LogoSvg = logo ? logo.svg : null

    return (
      <div className={styles[baseClassName]}>
        {LogoSvg ? (
          <LogoSvg className={styles[`${baseClassName}__logo`]} />
        ) : (
          <Lockup borderless kicker={name} />
        )}
      </div>
    )
  }
}

Sponsor.propTypes = {
  name: PropTypes.string
}

export default Sponsor
