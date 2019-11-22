import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Lockup } from '../lockup/Lockup'
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden'
import SmartLink from '../smart-link/SmartLink'
import logos from './logos'
import styles from './Sponsor.styl'

const paramCase = require('param-case')
const svgs = require.context('./logos', false, /\.svg$/)

const baseClassName = 'sponsor'

const SponsorLogo = ({ name, href, target, children }) => {
  const Container = href ? SmartLink : Fragment

  return (
    <Container href={href} target={target}>
      <VisuallyHidden>{name}</VisuallyHidden>
      {children}
    </Container>
  )
}

SponsorLogo.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.node
}

const Sponsor = class extends PureComponent {
  render() {
    const { name } = this.props

    if (!name) return null

    const key = paramCase(name || '')
    const logo = logos[key] || {}
    const logoKey = `./${key}.svg`
    const LogoSvg = svgs.keys().find(key => key === logoKey)
      ? svgs(logoKey).default
      : null

    return (
      <div className={styles[baseClassName]}>
        {LogoSvg ? (
          <SponsorLogo name={name} href={logo.href} target={logo.target}>
            <LogoSvg className={styles[`${baseClassName}__logo`]} />
          </SponsorLogo>
        ) : (
          <Lockup
            borderless
            kicker={name}
            kickerAttributes={{ href: logo.href, target: logo.target }}
          />
        )}
      </div>
    )
  }
}

Sponsor.propTypes = {
  name: PropTypes.string
}

export default Sponsor
