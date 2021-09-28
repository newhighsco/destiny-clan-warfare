import React from 'react'
import { node, object } from 'prop-types'
import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'

const PageContainer = ({ meta, children }) => (
  <ThemedPageContainer
    as="main"
    id="content"
    role="main"
    header={<header>Header</header>}
    footer={<footer>Footer</footer>}
    gutter
  >
    {children}
  </ThemedPageContainer>
)

PageContainer.propTypes = {
  meta: object,
  children: node
}

export default PageContainer
export { PageContainer }
