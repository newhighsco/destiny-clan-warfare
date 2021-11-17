export const possessive = (value: string) => {
  return value ? value + (value.substr(-1) === 's' ? "'" : "'s") : value
}
