import { useEffect } from 'react'

const useFetch = ({ lang }) => {
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const location = window.location.href
                    const website = location.split('?')[0]
                    const queries = location.split('?')[1]
                    const response = await fetch(
                         `https://hotelistan-services.freeddns.org/api/tracker?drname=BarisCin&website=${website}&lang=${lang}&${queries}`,
                         {
                              credentials: 'include',
                         }
                    )
                    const data = await response.json()
               } catch (error) {
                    console.error(error)
               }
          }

          fetchData()
     }, [])

     return
}

export default useFetch
