import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Button, SmartLink } from '@newhighsco/chipset'
import { HoldingPageContainer } from '@components/PageContainer'
import { Logo, LogoSize } from '@components/Logo'

const NotFoundPage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <HoldingPageContainer meta={meta}>
      <Link href="/" passHref>
        <SmartLink>
          <Logo size={LogoSize.Medium} />
          <Button.Group>
            <Button>Return to homepage</Button>
          </Button.Group>
        </SmartLink>
      </Link>
    </HoldingPageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        title: 'Page not found',
        description: 'Sorry, this page could not be found',
        noindex: true,
        nofollow: true
      }
    }
  }
}

export default NotFoundPage
