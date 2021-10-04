import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  CreditLockup,
  FooterContainer,
  Grid,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import { LogoIcon, LogoSize } from '@components/Logo'

import styles from './Footer.module.scss'

interface FooterProps {
  size?: string
}

const year = new Date().getFullYear()
const links = [
  {
    children: <>&copy;{year}</>
  }
]

const Footer: React.FC<FooterProps> = ({ size }) => (
  <FooterContainer theme={{ root: styles.root, content: styles.content }}>
    <SmartLink href="#top" title="Back to top" className={styles.logo}>
      <LogoIcon size={LogoSize.Small} />
    </SmartLink>
    <ContentContainer gutter size={size}>
      <Grid reverse valign="middle" gutter="quadruple">
        <Grid.Item sizes={['tablet-one-half']}>
          <Navigation
            title="Footer navigation"
            inline
            links={links}
            renderLink={({ href, children, ...rest }) => {
              if (!href) {
                return <span {...rest}>{children}</span>
              }

              return (
                <Link href={href} passHref>
                  <SmartLink {...rest}>{children}</SmartLink>
                </Link>
              )
            }}
            theme={{ root: styles.links, item: styles.item, link: styles.link }}
          />
        </Grid.Item>
        <Grid.Item sizes={['tablet-one-half']}>
          <CreditLockup
            theme={{
              root: styles.credit,
              logo: styles.creditLogo,
              text: styles.creditText
            }}
          />
        </Grid.Item>
      </Grid>
    </ContentContainer>
  </FooterContainer>
)

export default Footer
