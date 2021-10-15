import React from 'react'
import { useSession } from 'next-auth/client'
import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import Header from '@components/Header'
import Footer from '@components/Footer'
import HoldingPageContainer from './HoldingPageContainer'
import LoadingPageContainer from './LoadingPageContainer'

export interface PageContainerProps {
  showHeader?: boolean
  showFooter?: boolean
  size?: string
  className?: string
  align?: string
  meta?: unknown
}

const PageContainer: React.FC<PageContainerProps> = ({
  showHeader = true,
  showFooter = true,
  size = 'desktopLarge',
  meta,
  children,
  ...rest
}) => {
  const [session] = useSession()

  return (
    <ThemedPageContainer
      header={showHeader && <Header size={size} user={session?.user} />}
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
