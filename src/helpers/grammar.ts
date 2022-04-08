import Autolinker from 'autolinker'

export const formatDescription = (value: string): string => {
  return Autolinker.link(value, { mention: 'twitter' }).replace(
    /\r?\n/g,
    '<br />'
  )
  // .split(/\r?\n/g)
  // .join('<br />')
}

export const possessive = (value: string): string => {
  return value ? value + (value.substr(-1) === 's' ? "'" : "'s") : value
}
