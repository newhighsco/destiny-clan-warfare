import React from 'react'
import Image from 'next/image'
import { Backdrop } from '@newhighsco/chipset'
import PageContainer, { PageContainerProps } from '@components/PageContainer'

import backgroundImage from '@images/holding-page.jpg'

import styles from './HoldingPageContainer.module.scss'

interface HoldingPageContainerProps {
  showBackground?: boolean
  meta?: PageContainerProps['meta']
  children?: React.ReactNode
}

const HoldingPageContainer: React.FC<HoldingPageContainerProps> = ({
  showBackground = true,
  children,
  ...rest
}) => {
  return (
    <PageContainer
      showHeader={false}
      showFooter={false}
      className={styles.root}
      align="center"
      {...rest}
    >
      {showBackground && (
        <Backdrop>
          <div className={styles.background}>
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
      )}
      {children}
    </PageContainer>
  )
}

export default HoldingPageContainer
