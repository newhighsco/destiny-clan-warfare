import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import {
  Backdrop,
  PageContainer as ThemedPageContainer
} from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import Header from '@components/Header'
import Footer from '@components/Footer'
import backgroundImage from '@images/holding-page.jpg'

import styles from './PageContainer.module.scss'
interface PageContainerProps {
  showHeader?: boolean
  showFooter?: boolean
  size?: string
  className?: string
  align?: string
  meta?: unknown
}

const PageContainer: React.FC<PageContainerProps> = ({
  showHeader = true,
  showFooter = false,
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

const HoldingPageContainer: React.FC<PageContainerProps> = ({
  children,
  ...rest
}) => {
  return (
    <PageContainer
      showHeader={false}
      showFooter={false}
      className={styles.holding}
      align="center"
      {...rest}
    >
      <Backdrop>
        <div className={styles.backdrop}>
          <Image
            src={backgroundImage}
            alt=""
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            objectPosition="50% 0"
          />
        </div>
      </Backdrop>
      {children}
    </PageContainer>
  )
}

export default PageContainer
export { PageContainer, HoldingPageContainer }
