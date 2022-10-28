import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { hexToRgb } from '@helpers/hex'
import { imageUrl } from '@helpers/images'
import { round } from '@helpers/stats'

import styles from './Avatar.module.scss'
import sizes from './_sizes.module.scss'

export enum AvatarSize {
  Small = 'small',
  Medium = 'medium'
}

interface Layer {
  fill?: string
  src?: string
}

interface AvatarLayerProps {
  id: number
  layers: Layer[]
  width?: number
}

const AvatarLayer: React.FC<AvatarLayerProps> = ({ id, layers, width }) => {
  const defs = []
  const images = []

  layers.forEach(({ fill, src }, index) => {
    if (fill && src) {
      const [r, g, b] = hexToRgb(fill).map(v => round(v / 255, 3))
      const key = [id, index].join('-')
      const anchor = [id, r, g, b].join('-')
      const props = { key, width: '100%', height: '100%' }

      defs.push(
        <filter {...props} id={anchor} x={0} y={0}>
          <feColorMatrix
            values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`}
          />
        </filter>
      )

      images.push(
        <image
          {...props}
          filter={`url(#${anchor})`}
          xlinkHref={imageUrl({ src, width })}
        />
      )
    }
  })

  if (!images.length) return null

  return (
    <svg className={styles.layer} viewBox="0 0 1 1">
      <defs>{defs.map(def => def)}</defs>
      <g>{images.map(image => image)}</g>
    </svg>
  )
}

interface AvatarProps extends Partial<Pick<AvatarLayerProps, 'id'>>, Layer {
  background?: Layer
  foreground?: Layer
  size?: AvatarSize
  outline?: boolean
  align?: AlignSetting
  className?: string
  children?: React.ReactNode
}

const Avatar: React.FC<AvatarProps> = ({
  src = 'https://www.bungie.net/img/profile/avatars/default_avatar.gif',
  fill: backgroundColor,
  background,
  foreground,
  size,
  outline,
  align,
  id,
  className,
  children
}) => {
  const hasLayers = background || foreground
  const width = parseInt(sizes.large)

  return (
    <div
      className={classNames(
        styles.root,
        children && styles.inline,
        size && styles[size],
        outline && styles.outline,
        align && styles[align],
        className
      )}
      style={{ backgroundColor }}
    >
      {hasLayers ? (
        <AvatarLayer
          id={id}
          layers={[background, foreground].filter(Boolean)}
          width={width}
        />
      ) : (
        children || <Image src={src} alt="" width={width} height={width} />
      )}
    </div>
  )
}

export default Avatar
