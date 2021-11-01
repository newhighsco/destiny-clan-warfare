import React from 'react'
import classNames from 'classnames'
import { ResponsiveMedia } from '@newhighsco/chipset'
import { AvatarLayer } from '@components/Avatar'
import { hexToRgb } from '@helpers/hex'
import { round } from '@helpers/stats'
import { ReactComponent as BannerSvg } from './banner.svg'
import { ReactComponent as StaffSvg } from './staff.svg'

import styles from './Banner.module.scss'

interface BannerMediaProps {
  id?: string
  viewBox?: string
  defs?: any
  layers: any
  className?: string
  clipPath?: string
  style?: any
}

const BannerMedia: React.FC<BannerMediaProps> = ({
  id,
  viewBox = '0 0 1 1',
  defs = [],
  layers,
  className,
  ...rest
}) => {
  const images = []

  layers.forEach(({ fill, src }) => {
    if (fill && src) {
      const hex = hexToRgb(fill)
      const r = round(hex.r / 255, 3)
      const g = round(hex.g / 255, 3)
      const b = round(hex.b / 255, 3)
      const key = [id, r, g, b].join('-')

      defs.push(
        <filter id={key} x="0" y="0" width="100%" height="100%">
          <feColorMatrix
            values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`}
          />
        </filter>
      )

      images.push(
        <image
          width="100%"
          height="100%"
          filter={`url(#${key})`}
          xlinkHref={src}
        />
      )
    }
  })

  if (!images.length) return null

  return (
    <svg viewBox={viewBox} className={classNames(styles.layer, className)}>
      <defs>{defs.map(def => def)}</defs>
      <g {...rest}>{images.map(image => image)}</g>
    </svg>
  )
}

const Banner: React.FC = ({ fill, background, emblem }: any) => {
  const height = 1.48
  // const layerProps = {
  //   viewBox: `0 0 262 410`,
  //   className: styles.layer
  // }

  return (
    <div className={styles.root}>
      <ResponsiveMedia ratio={height / 1} className={styles.layers}>
        {/* <AvatarLayer
          layers={[background, emblem?.background, emblem?.foreground].filter(
            Boolean
          )}
          {...layerProps}
          style={{ backgroundColor: fill }}
        /> */}
        <BannerMedia
          defs={[
            <clipPath key="foo" id="foo">
              <path
                d="M111 41.1901C105.205 35.442 99.7132 31.8506 92 29.0978C83.8 31.4962 70.1 32.9951 54.5 32.9951C32.8 32.9951 14.7 29.9972 10.1 26C8.24956 26 6 26 4 26V312H111V41.1901Z M250.9 26C246.3 29.9972 228.2 32.9951 206.5 32.9951C190.9 32.9951 177.2 31.4962 169 29.0978C163.4 31.0964 154 35.4934 150 41.1894V312H257V26C254.967 26 252.933 26 250.9 26Z"
                fill="#000"
              />
            </clipPath>
          ]}
          layers={[background, emblem?.background, emblem?.foreground].filter(
            Boolean
          )}
          viewBox="0 0 262 410"
          clipPath="url(#foo)"
          style={{ backgroundColor: fill }}
        />
      </ResponsiveMedia>
      <StaffSvg className={styles.staff} />
    </div>
  )
}

export default Banner
