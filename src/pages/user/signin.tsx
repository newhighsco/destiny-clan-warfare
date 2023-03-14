import { Button } from '@newhighsco/chipset'
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next'
import { getCsrfToken, getProviders, getSession } from 'next-auth/react'
import React from 'react'

import { Logo, LogoSize } from '~components/Logo'
import { HoldingPageContainer } from '~components/PageContainer'
import { canonicalUrl, userUrl } from '~helpers/urls'

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
      <form action={provider.signinUrl} method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input
          type="hidden"
          name="callbackUrl"
          value={canonicalUrl(userUrl())}
        />
        <Button.Group>
          <Button type="submit">Sign in to Bungie.net</Button>
        </Button.Group>
      </form>
    </HoldingPageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: userUrl(),
        permanent: false
      }
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      provider: await getProviders().then(providers => providers?.bungie)
    }
  }
}

export default UserSignInPage
