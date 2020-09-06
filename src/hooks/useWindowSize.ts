import * as React from 'react'

export default function useWindowSize(): { width?: number; height?: number } {
  const [windowSize, setWindowSize] = React.useState<{
    width?: number
    height?: number
  }>({
    width: undefined,
    height: undefined,
  })

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}
