export const round = (value: number, precision: number): number => {
  const factor = Math.pow(10, precision)

  return Math.round(value * factor) / factor
}
