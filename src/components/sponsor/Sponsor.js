import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Lockup } from '../lockup/Lockup'
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden'
import styles from './Sponsor.styl'

const paramCase = require('param-case')
const svgs = require.context('./logos', false, /\.svg$/)

const baseClassName = 'sponsor'

class Sponsor extends PureComponent {
  render() {
    const { name } = this.props

    if (!name) return null

    const key = paramCase(name || '')
    const logoKey = `./${key}.svg`
    const LogoSvg = svgs.keys().find(key => key === logoKey)
      ? svgs(logoKey).default
      : null

    return (
      <div className={styles[baseClassName]}>
        {LogoSvg ? (
          <Fragment>
            <VisuallyHidden>{name}</VisuallyHidden>
            <LogoSvg className={styles[`${baseClassName}__logo`]} />
          </Fragment>
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
