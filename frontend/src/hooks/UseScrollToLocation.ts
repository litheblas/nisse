import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Solution copied from https://ericdcobb.medium.com/scrolling-to-an-anchor-in-react-when-your-elements-are-rendered-asynchronously-8c64f77b5f34
export const useScrollToLocation = () => {
  const scrolledRef = useRef(false)
  const { hash } = useLocation()
  const hashRef = useRef(hash)

  useEffect(() => {
    if (hash) {
      // We want to reset if the hash has changed
      if (hashRef.current !== hash) {
        hashRef.current = hash
        scrolledRef.current = false
      }

      // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
      if (!scrolledRef.current) {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          scrolledRef.current = true
        }
      }
    }
  })
}
