import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { canonicalUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import config from '@config'

const { logo, name, socialLinks, title, url } = config

const HomePage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageContainer meta={meta}>
      <SocialProfileJsonLd
        type="Organization"
        name={name}
        url={url}
        sameAs={[socialLinks.twitter]}
      />
      {logo?.bitmap && (
        <LogoJsonLd url={url} logo={canonicalUrl(logo.bitmap)} />
      )}
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        canonical: canonicalUrl(),
        customTitle: true,
        title
      }
    }
  }
}

export default HomePage
