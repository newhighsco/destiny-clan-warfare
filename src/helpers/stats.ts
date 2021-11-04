export const round = (value: number, precision: number): number => {
  const factor = Math.pow(10, precision)

  return Math.round(value * factor) / factor
}

export const percentage = (
  current: number,
  total: number,
  precision = 0,
  limit: boolean
) => {
  let result = (current / total) * 100

  if (limit) result = Math.max(0, Math.min(result, 100))

  return round(result, precision)
}

export const shortNumber = (value: number | string): string => {
  if (typeof value !== 'number') return value
  if (value > 1e19) return `${value}`
  if (value < -1e19) return `${value}`
  if (Math.abs(value) < 1000) return `${value}`

  const prefix = value < 0 ? '-' : ''
  const suffixes = [
    { label: 'K', exponent: 6, precision: 1 },
    { label: 'M', exponent: 9, precision: 2 },
    { label: 'B', exponent: 12, precision: 3 },
    { label: 'T', exponent: 16, precision: 4 }
  ]

  value = Math.abs(value)

  const size = Math.floor(value).toString().length
  const exponent = size % 3 === 0 ? size - 3 : size - (size % 3)
  const suffix = suffixes.find(suffix => exponent < suffix.exponent)
  const shortNumber = round(value / Math.pow(10, exponent), suffix.precision)

  return [prefix, shortNumber, suffix.label].join('')
}
