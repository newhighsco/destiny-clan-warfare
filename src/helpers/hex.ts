export const isHex = (hex: string): RegExpExecArray => {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
}

export const hexToRgb = (
  hex: string
): {
  r: number
  g: number
  b: number
} => {
  const result = isHex(hex)

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 255, g: 255, b: 255 }
}
