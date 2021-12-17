import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { Button, Grid } from '@newhighsco/chipset'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import config from '@config'
import Event from '@components/Event'
import { getEvent } from '@libs/api'

const { logo, name, socialLinks, title, url } = config

const HomePage: React.FC = ({
  currentEvent,
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
      <Grid>
        <Grid.Item sizes={['one-quarter']}>Previous event</Grid.Item>
        <Grid.Item sizes={['one-half']}>
          <Event {...currentEvent} summary />
        </Grid.Item>
        <Grid.Item sizes={['one-quarter']}>Next event</Grid.Item>
      </Grid>
      <Button.Group>
        <Link href={eventUrl()} passHref>
          <Button>View all events</Button>
        </Link>
      </Button.Group>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Get current event from API
  const currentEvent = await getEvent(3)

  return {
    props: {
      currentEvent,
      meta: {
        canonical: canonicalUrl(),
        customTitle: true,
        title
      }
    }
  }
}

export default HomePage
