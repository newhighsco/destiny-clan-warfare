export const encode = (value: string): string => {
  const buffer = []

  for (let i = value.length - 1; i >= 0; i--) {
    buffer.unshift(['&#', value.charCodeAt(i), ';'].join(''))
  }

  return buffer.join('')
}

export const decode = (value: string): string => {
  return value.replace(/&#(\d+);/g, (_, entity) => String.fromCharCode(entity))
}
