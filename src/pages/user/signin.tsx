import { Button } from '@newhighsco/chipset'
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth/next'
import { getCsrfToken, getProviders } from 'next-auth/react'
import React from 'react'

import { Logo, LogoSize } from '~components/Logo'
import { HoldingPageContainer } from '~components/PageContainer'
import { canonicalUrl, userUrl } from '~helpers/urls'

import { authOptions } from '../api/auth/[...nextauth]'

const UserSignInPage: React.FC = ({
  csrfToken,
  provider
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const meta = {
    title: 'Sign in',
    description: 'TODO: Add meta description',
    noindex: true,
    nofollow: true
  }

  return (
    <HoldingPageContainer meta={meta}>
      <Logo size={LogoSize.Medium} />
      <form action={provider?.signinUrl} method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input
          type="hidden"
          name="callbackUrl"
          value={canonicalUrl(userUrl())}
        />
        <Button.Group>
          <Button type="submit">Sign in to {provider?.name}</Button>
        </Button.Group>
      </form>
    </HoldingPageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return { redirect: { destination: userUrl(), permanent: false } }
  }

  const csrfToken = await getCsrfToken(context)
  const { bungie: provider } = await getProviders()

  return { props: { csrfToken, provider } }
}

export default UserSignInPage
