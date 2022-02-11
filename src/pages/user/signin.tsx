import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getProviders, getSession, getCsrfToken } from 'next-auth/client'
import { Button } from '@newhighsco/chipset'
import { HoldingPageContainer } from '@components/PageContainer'
import { canonicalUrl, userUrl } from '@helpers/urls'
import { Logo, LogoSize } from '@components/Logo'

const UserSignInPage: React.FC = ({
  csrfToken,
  provider,
  meta
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      provider: await getProviders().then(providers => providers?.bungie),
      meta: {
        title: 'Sign in',
        description: 'TODO: Add meta description',
        noindex: true,
        nofollow: true
      }
    }
  }
}

export default UserSignInPage
