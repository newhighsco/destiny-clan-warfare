// @ts-ignore import is aliased in webpack config
import * as _NextImage from 'sb-original/next/image'
import { ImageProps } from 'next/image'
import React from 'react'

const OriginalNextImage = _NextImage.default

const NextImage = (props: ImageProps) => {
  return (
    <OriginalNextImage
      {...props}
      unoptimized
      priority={undefined}
      blurDataURL="data:image/svg+xml,<svg/>"
    />
  )
}

export default NextImage
