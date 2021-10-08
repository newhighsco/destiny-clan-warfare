import React from 'react'
import { GetStaticProps } from 'next'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import urlJoin from 'url-join'
import PageContainer, { PageContainerProps } from '@components/PageContainer'
import config from '@config'

const { logo, name, socialLinks, title, url } = config

const HomePage: React.FC<PageContainerProps> = ({ meta }) => {
  return (
    <PageContainer meta={meta}>
      <SocialProfileJsonLd
        type="Organization"
        name={name}
        url={url}
        sameAs={[socialLinks.twitter]}
      />
      {logo?.bitmap && (
        <LogoJsonLd url={url} logo={urlJoin(url, logo.bitmap)} />
      )}
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        canonical: urlJoin(url, '/'),
        customTitle: true,
        title
      }
    }
  }
}

export default HomePage
