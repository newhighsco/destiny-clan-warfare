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
  fill?: string
  src?: string
}

const AvatarLayer: React.FC<AvatarLayerProps> = ({ id, fill, src }) => {
  if (!fill || !src) return null

  const hex = hexToRgb(fill)
  const r = round(hex.r / 255, 3)
  const g = round(hex.g / 255, 3)
  const b = round(hex.b / 255, 3)

  return (
    <svg className={styles.layer} viewBox="0 0 1 1">
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feColorMatrix
          values={`${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`}
        />
      </filter>
      <image
        width="100%"
        height="100%"
        filter={`url(#${id})`}
        xlinkHref={src}
      />
    </svg>
  )
}

interface AvatarProps extends Partial<AvatarLayerProps> {
  background?: AvatarLayerProps
  foreground?: AvatarLayerProps
  size?: AvatarSize
  outline?: boolean
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
        size && styles[size],
        outline && styles.outline
      )}
      style={{ backgroundColor: fill }}
    >
      <ResponsiveMedia ratio="1:1">
        {hasLayers ? (
          <>
            {background && <AvatarLayer id={`${id}-bg`} {...background} />}
            {foreground && <AvatarLayer id={`${id}-fg`} {...foreground} />}
          </>
        ) : (
          children || <Image src={src} alt="" layout="fill" objectFit="cover" />
        )}
      </ResponsiveMedia>
    </div>
  )
}

export default Avatar
