import {
  type ImageConfigComplete,
  type ImageLoaderProps
} from 'next/dist/shared/lib/image-config'
import imageLoader from 'next/dist/shared/lib/image-loader'

export const imageUrl = ({ src, width, quality }: ImageLoaderProps): string => {
  const config = process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete

  if (!config) return src

  return imageLoader({ config, src, width, quality })
}
