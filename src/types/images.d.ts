declare module '*.jpg'
declare module '*.png'

declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>

  const src: string
  export default src
}
