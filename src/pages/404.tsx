import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import PageContainer from '@components/PageContainer'

const NotFoundPage: React.FC = ({
  meta
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PageContainer meta={meta}>&nbsp;</PageContainer>
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
