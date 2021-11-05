import { useEffect, useRef } from 'react'

function useInterval(callback: () => void, delay: number | null) {
  const ref = useRef(callback)

  useEffect(() => {
    ref.current = callback
  }, [callback])

  useEffect(() => {
    if (!delay) return

    const id = setInterval(() => ref.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
