import { Button, SmartLink } from '@newhighsco/chipset'
import Link from 'next/link'
import React from 'react'

import { Logo, LogoSize } from '~components/Logo'
import { HoldingPageContainer } from '~components/PageContainer'

const NotFoundPage: React.FC = () => {
  const meta = {
    title: 'Page not found',
    description: 'Sorry, this page could not be found',
    noindex: true,
    nofollow: true
  }

  return (
    <HoldingPageContainer meta={meta}>
      <Link href="/" passHref legacyBehavior prefetch={false}>
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

export default NotFoundPage
