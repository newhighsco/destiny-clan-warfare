import React from 'react'
import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import Header from '@components/Header'
import Footer from '@components/Footer'

export interface PageContainerProps {
  meta?: unknown
}

const PageContainer: React.FC<PageContainerProps> = ({ meta, children }) => (
  <ThemedPageContainer header={<Header />} footer={<Footer />} gutter>
    <Meta {...meta} />
    {children}
  </ThemedPageContainer>
)

export default PageContainer
export { PageContainer }
