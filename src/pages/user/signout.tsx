import { Button } from '@newhighsco/chipset'
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth/next'
import { getCsrfToken } from 'next-auth/react'
import React from 'react'

import { Logo, LogoSize } from '~components/Logo'
import { HoldingPageContainer } from '~components/PageContainer'
import { canonicalUrl } from '~helpers/urls'

import { authOptions } from '../api/auth/[...nextauth]'

const UserSignInPage: React.FC = ({
  csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const meta = {
    title: 'Sign out',
    description: 'TODO: Add meta description',
    noindex: true,
    nofollow: true
  }

  return (
    <HoldingPageContainer meta={meta}>
      <Logo size={LogoSize.Medium} />
      <form action="/api/auth/signout" method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value={canonicalUrl()} />
        <Button.Group>
          <Button type="submit">Sign out</Button>
        </Button.Group>
      </form>
    </HoldingPageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return { redirect: { destination: '/', permanent: false } }
  }

  const csrfToken = await getCsrfToken(context)

  return { props: { csrfToken } }
}

export default UserSignInPage
