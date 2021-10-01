import React from 'react'
import { GetStaticProps } from 'next'
import urlJoin from 'url-join'
import PageContainer, { PageContainerProps } from '@components/PageContainer'
import config from '@config'

const { title } = config
const url = process.env.NEXT_PUBLIC_SITE_URL

const HomePage: React.FC<PageContainerProps> = ({ meta }) => {
  return <PageContainer meta={meta}>&nbsp;</PageContainer>
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      meta: {
        canonical: urlJoin(url, '/'),
        customTitle: true,
        title
      }
    }
  }
}

export default HomePage
