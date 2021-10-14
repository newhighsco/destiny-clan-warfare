import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getCsrfToken, getSession } from 'next-auth/client'
import { Button } from '@newhighsco/chipset'
import { HoldingPageContainer } from '@components/PageContainer'
import { Logo, LogoSize } from '@components/Logo'
import { canonicalUrl } from '@helpers/urls'

const UserSignInPage: React.FC = ({
  csrfToken,
  meta
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      meta: {
        title: 'Sign out',
        description: 'TODO: Add meta description',
        noindex: true,
        nofollow: true
      }
    }
  }
}

export default UserSignInPage
