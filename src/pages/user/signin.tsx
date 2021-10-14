import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getProviders, getSession, getCsrfToken } from 'next-auth/client'
import { Button } from '@newhighsco/chipset'
import { HoldingPageContainer } from '@components/PageContainer'
import { canonicalUrl, userUrl } from '@helpers/urls'
import { Logo, LogoSize } from '@components/Logo'

const UserSignInPage: React.FC = ({
  csrfToken,
  providers,
  meta
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const provider = providers.bungie

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
          <Button type="submit">Authorize with Bungie.net</Button>
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
      providers: await getProviders(),
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
