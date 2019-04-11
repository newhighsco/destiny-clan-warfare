import React, { PureComponent, Fragment } from 'react'
import { OutboundLink } from 'react-ga-donottrack'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Swatch from '../components/swatch/Swatch'
import Prose from '../components/prose/Prose'

const constants = require('../utils/constants')
const meta = {
  title: 'Branding',
  description: `Branding guidelines for ${constants.meta.name}`,
  robots: 'noindex,nofollow'
}
const colours = [
  { name: 'Terracotta', value: '#e27365' },
  { name: 'Equator', value: '#e2b265' },
  { name: 'Lemon', value: '#d6da2a' },
  { name: 'Pastel green', value: '#65e273' },
  { name: 'Cornflower', value: '#6596e2' },
  { name: 'White', value: '#fff' },
  { name: 'White smoke', value: '#f4f4f4' },
  { name: 'Silver', value: '#b3b3b3' },
  { name: 'Eclipse', value: '#404040' },
  { name: 'Nightrider', value: '#333' },
  { name: 'Nero', value: '#262626' },
  { name: 'Black', value: '#000' }
]
const logos = [
  { name: 'Combined - small', value: 'Logo_Small' },
  { name: 'Combined - medium', value: 'Logo_Medium' },
  { name: 'Combined - large', value: 'Logo_Large' },
  { name: 'Icon', value: 'Logo_Icon' },
  { name: 'Lockup', value: 'Logo_Lockup' }
]
const extensions = [ 'png', 'psd', 'svg' ]
const files = require.context('../images/branding', false, /\.(png|psd|svg)$/)

class BrandingPage extends PureComponent {
  render () {
    return (
      <PageContainer meta={meta}>
        <Lockup primary center element="h1" kicker="Branding" />
        <Card>
          <Lockup center element="h2" heading="Logos" />
          <div className="grid--bottomed grid grid--reverse grid--stacked">
            {logos.map((logo, index) => {
              const Svg = require(`../images/branding/${logo.value}.svg`).ReactComponent

              // console.log(require(`../images/branding/${logo.value}.svg`))

              return (
                <Fragment key={index}>
                  {index > 0 &&
                    <div className="grid__item"><hr /></div>
                  }
                  <div className="grid__item tablet-two-thirds tablet-landscape-three-quarters">
                    <div className="text-center">
                      <Svg />
                    </div>
                  </div>
                  <div className="grid__item tablet-one-third tablet-landscape-one-quarter">
                    <Prose className="text-center-mobile">
                      <h3>{logo.name}</h3>
                      <ul className="list--inline list--comma">
                        {extensions.map((extension, index) => {
                          const fileKey = `./${logo.value}.${extension}`
                          const file = files.keys().find(key => key === fileKey) ? files(fileKey) : null

                          return (
                            <li key={index}>
                              <OutboundLink to={file.default || file} eventLabel="branding" title={`Download ${extension.toUpperCase()}`} target="_blank">{extension.toUpperCase()}</OutboundLink>
                            </li>
                          )
                        })}
                      </ul>
                    </Prose>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </Card>
        <Card center>
          <Lockup center element="h2" heading="Colours" />
          <div className="grid grid--stacked">
            {colours.map((colour, index) => (
              <div key={index} className="grid__item one-half tablet-one-third tablet-landscape-one-quarter">
                <Swatch {...colour} />
              </div>
            ))}
          </div>
        </Card>
      </PageContainer>
    )
  }
}

export default BrandingPage
