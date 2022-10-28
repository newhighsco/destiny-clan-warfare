export const isHex = (hex: string): RegExpExecArray => {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
}

export const hexToRgb = (hex: string): [r: number, g: number, b: number] => {
  const result = isHex(hex) || []
  const [, r = 255, g = 255, b = 255] = result.map((value: string) =>
    parseInt(value, 16)
  )

  return [r, g, b]
}
