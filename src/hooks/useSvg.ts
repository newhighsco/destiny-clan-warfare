import React, { useEffect, useState } from 'react'

function useSvg(
  name: string
): [boolean, React.FC<React.HTMLAttributes<SVGElement>> | null] {
  const [Icon, setIcon] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const importIcon = async (): Promise<void> => {
      try {
        setIcon(
          await import(
            /* webpackChunkName: "[request]" */ `@images/icons/${name}.svg`
          )
        )
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

  return [loading, Icon?.ReactComponent]
}

export default useSvg
