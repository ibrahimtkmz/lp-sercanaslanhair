import { useState, useEffect } from 'react'

const useScrollVisibility = (offset) => {
   const [isVisible, setIsVisible] = useState(false)
   const [isEnd, setIsEnd] = useState(false)

   const handleScroll = () => {
      const scrollY = window.scrollY
      const isAtEnd =
         window.innerHeight + scrollY >= document.documentElement.scrollHeight

      setIsVisible(scrollY >= offset)
      setIsEnd(isAtEnd)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return { isVisible, isEnd }
}

export default useScrollVisibility
