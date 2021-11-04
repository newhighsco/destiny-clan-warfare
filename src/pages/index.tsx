import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { Button, Card, Grid } from '@newhighsco/chipset'
import { canonicalUrl, eventUrl } from '@helpers/urls'
import PageContainer from '@components/PageContainer'
import config from '@config'
import Lockup from '@components/Lockup'

const { logo, name, socialLinks, title, url } = config

const HomePage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const currentEvent = {
    id: '1',
    name: 'The name of the event',
    description: 'Current event'
  }

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
          <Lockup
            kicker="Current event"
            kickerAttributes={{ as: 'h1' }}
            align="center"
            highlight
          />
          <Card
            heading={
              <Lockup
                heading={currentEvent.name}
                headingAttributes={{
                  as: 'h2',
                  href: eventUrl(currentEvent.id)
                }}
                align="center"
              />
            }
            align="center"
          >
            {currentEvent.description}
            <Button.Group>
              <Link href={eventUrl(currentEvent.id)} passHref>
                <Button>View...</Button>
              </Link>
            </Button.Group>
          </Card>
        </Grid.Item>
        <Grid.Item sizes={['one-quarter']}>Next event</Grid.Item>
        <Grid.Item align="center">
          <Button.Group>
            <Link href={eventUrl()} passHref>
              <Button>View all events</Button>
            </Link>
          </Button.Group>
        </Grid.Item>
      </Grid>
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
