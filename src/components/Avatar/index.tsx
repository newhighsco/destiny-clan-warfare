import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { hexToRgb } from '@helpers/hex'
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
  height?: number
  viewBox?: React.SVGProps<SVGSVGElement>['viewBox']
}

const AvatarLayer: React.FC<AvatarLayerProps> = ({
  id,
  layers,
  width = '100%',
  height = width,
  viewBox = '0 0 1 1'
}) => {
  const defs = []
  const images = []

  layers.forEach(({ fill, src }, index) => {
    if (fill && src) {
      const [r, g, b] = hexToRgb(fill).map(v => round(v / 255, 3))
      const key = [id, index].join('-')
      const anchor = [id, r, g, b].join('-')

      defs.push(
        <filter key={key} id={anchor} x={0} y={0} width={width} height={height}>
          <feColorMatrix
            values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`}
          />
        </filter>
      )

      images.push(
        <image
          key={key}
          width={width}
          height={height}
          filter={`url(#${anchor})`}
          xlinkHref={src}
        />
      )
    }
  })

  if (!images.length) return null

  return (
    <svg className={styles.layer} viewBox={viewBox}>
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
        />
      ) : (
        children || <Image src={src} alt="" fill sizes={sizes.large} />
      )}
    </div>
  )
}

export default Avatar
