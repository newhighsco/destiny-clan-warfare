import React from 'react'
import {
  ContentContainer,
  PageContainer as ThemedPageContainer
} from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import Header from '@components/Header'
import Footer from '@components/Footer'

export interface PageContainerProps {
  meta?: unknown
  size?: string
}

const PageContainer: React.FC<PageContainerProps> = ({
  size = 'desktopLarge',
  meta,
  children
}) => (
  <ThemedPageContainer
    header={<Header size={size} />}
    footer={<Footer size={size} />}
  >
    <Meta {...meta} />
    <ContentContainer gutter size={size}>
      {children}
    </ContentContainer>
  </ThemedPageContainer>
)

export default PageContainer
export { PageContainer }
