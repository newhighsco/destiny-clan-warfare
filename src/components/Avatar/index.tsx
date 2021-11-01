import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { ResponsiveMedia } from '@newhighsco/chipset'
import { hexToRgb } from '@helpers/hex'
import { round } from '@helpers/stats'

import styles from './Avatar.module.scss'

export enum AvatarSize {
  Small = 'small'
}

interface AvatarLayerProps {
  id: string
  layers: Array<{
    fill?: string
    src?: string
  }>
  viewBox?: string
  className?: string
}

export const AvatarLayer: React.FC<AvatarLayerProps> = ({
  id,
  viewBox = '0 0 1 1',
  layers,
  className
}) => {
  const defs = []
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
    <svg className={classNames(styles.layer, className)} viewBox={viewBox}>
      <defs>{defs.map(def => def)}</defs>
      <g>{images.map(image => image)}</g>
    </svg>
  )
}

interface AvatarProps extends Partial<AvatarLayerProps> {
  background?: any
  foreground?: any
  size?: AvatarSize
  outline?: boolean
  src?: string
  fill?: string
}

const Avatar: React.FC<AvatarProps> = ({
  src = 'https://bungie.destinyclanwarfare.com/img/profile/avatars/default_avatar.gif',
  fill,
  background,
  foreground,
  size,
  outline,
  id,
  children
}) => {
  const hasLayers = background || foreground

  return (
    <div
      className={classNames(
        styles.root,
        children && styles.inline,
        size && styles[size],
        outline && styles.outline
      )}
      style={{ backgroundColor: fill }}
    >
      <ResponsiveMedia ratio="1:1">
        {hasLayers ? (
          <AvatarLayer
            id={id}
            layers={[background, foreground].filter(Boolean)}
          />
        ) : (
          children || <Image src={src} alt="" layout="fill" objectFit="cover" />
        )}
      </ResponsiveMedia>
    </div>
  )
}

export default Avatar
