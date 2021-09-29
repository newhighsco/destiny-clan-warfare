import React from 'react'
import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'
import Header from '@components/Header'
import Footer from '@components/Footer'

const PageContainer: React.FC = ({ children }) => (
  <ThemedPageContainer
    as="main"
    id="content"
    role="main"
    header={<Header />}
    footer={<Footer />}
    gutter
  >
    {children}
  </ThemedPageContainer>
)

export default PageContainer
export { PageContainer }
