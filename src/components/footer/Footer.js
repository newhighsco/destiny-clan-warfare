import React, { PureComponent } from 'react'
import { LogoIcon } from '../logo/Logo'
import ContentContainer from '../content-container/ContentContainer'
import { Grid, GridItem } from '../grid/Grid'
import List from '../list/List'
import SmartLink from '../smart-link/SmartLink'
import Credit from '../credit/Credit'
import styles from './Footer.styl'

const baseClassName = 'footer'
const enableSponsorship = JSON.parse(process.env.ENABLE_SPONSORSHIP || true)
const date = new Date()
const links = [
  { href: '/faqs/', text: 'FAQs' },
  { href: '/support-us/', text: 'Support us', hidden: !enableSponsorship }
]

const Footer = class extends PureComponent {
  render() {
    return (
      <footer className={styles[baseClassName]} role="contentinfo">
        <a
          href="#top"
          title="Back to top"
          className={styles[`${baseClassName}__logo`]}
        >
          <LogoIcon
            size="small"
            className={styles[`${baseClassName}__logo-icon`]}
          />
        </a>
        <ContentContainer gutter>
          <Grid reverse middled gutter="quadruple">
            <GridItem sizes={['tablet-one-half']}>
              <List inline className={styles[`${baseClassName}__list`]}>
                {links
                  .filter(({ hidden }) => !hidden)
                  .map((link, i) => {
                    return (
                      <li key={i} className={styles[`${baseClassName}__item`]}>
                        <SmartLink
                          className={styles[`${baseClassName}__link`]}
                          href={link.href}
                        >
                          {link.text}
                        </SmartLink>
                      </li>
                    )
                  })}
                <li className={styles[`${baseClassName}__item`]}>
                  <span className={styles[`${baseClassName}__link`]}>
                    &copy;{date.getFullYear()}
                  </span>
                </li>
              </List>
            </GridItem>
            <GridItem sizes={['tablet-one-half']}>
              <Credit />
            </GridItem>
          </Grid>
        </ContentContainer>
      </footer>
    )
  }
}

export default Footer
