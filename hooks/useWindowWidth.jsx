'use client'
import { useState, useEffect } from 'react'

function useWindowWidth() {
   const [windowWidth, setWindowWidth] = useState(null)

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth)
      }

      if (typeof window !== 'undefined') {
         window.addEventListener('resize', handleResize)
         setWindowWidth(window.innerWidth)
      }

      return () => {
         if (typeof window !== 'undefined') {
            window.removeEventListener('resize', handleResize)
         }
      }
   }, [])

   return windowWidth
}

export default useWindowWidth
