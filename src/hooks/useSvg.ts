import React, { useEffect, useRef, useState } from 'react'

function useSvg(
  name: string
): [boolean, React.FC<React.HTMLAttributes<SVGElement>> | null] {
  const ref = useRef<React.FC<React.SVGProps<SVGSVGElement>>>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const importIcon = async (): Promise<void> => {
      try {
        ref.current = (
          await import(
            /* webpackChunkName: "[request]" */ `@images/icons/${name}.svg`
          )
        ).ReactComponent
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    importIcon()

    return () => {
      mounted = false
    }
  }, [name])

  return [loading, ref.current || null]
}

export default useSvg
