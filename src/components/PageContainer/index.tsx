import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import type PropTypes from 'prop-types'
import React from 'react'

import Footer from '~components/Footer'
import Header from '~components/Header'

import HoldingPageContainer from './HoldingPageContainer'
import LoadingPageContainer from './LoadingPageContainer'

export interface PageContainerProps {
  showHeader?: boolean
  showFooter?: boolean
  size?: string
  className?: string
  align?: string
  meta?: PropTypes.InferProps<Meta.propTypes>
  children?: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({
  showHeader = true,
  showFooter = true,
  size = 'desktopLarge',
  meta,
  children,
  ...rest
}) => {
  return (
    <ThemedPageContainer
      header={showHeader && <Header size={size} />}
      footer={showFooter && <Footer size={size} />}
      gutter
      size={size}
      {...rest}
    >
      <Meta {...meta} />
      {children}
    </ThemedPageContainer>
  )
}

export default PageContainer
export { HoldingPageContainer, LoadingPageContainer }
