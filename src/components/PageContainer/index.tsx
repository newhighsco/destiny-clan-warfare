import React from 'react'
import { useSession } from 'next-auth/client'
import {
  ContentContainer,
  PageContainer as ThemedPageContainer
} from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import Header from '@components/Header'
import Footer from '@components/Footer'

interface PageContainerProps {
  meta?: unknown
  size?: string
}

const PageContainer: React.FC<PageContainerProps> = ({
  size = 'desktopLarge',
  meta,
  children
}) => {
  const [session] = useSession()

  return (
    <ThemedPageContainer
      header={<Header size={size} user={session?.user} />}
      footer={<Footer size={size} />}
    >
      <Meta {...meta} />
      <ContentContainer gutter size={size}>
        {children}
      </ContentContainer>
    </ThemedPageContainer>
  )
}

export default PageContainer
export { PageContainer }
