'use client'
import { useEffect, useState } from 'react'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'

const useIntlTelInput = (mobileInputId, countryInputId) => {
   const [iti, setIti] = useState(null)

   useEffect(() => {
      const mobileInput = document.querySelectorAll(`#${mobileInputId}`)[0]
      const countryInput = document.querySelectorAll(`#${countryInputId}`)[0]

      var itiInstance = intlTelInput(mobileInput, {
         initialCountry: 'auto',
         autoPlaceholder: 'polite',
         nationalMode: false,
         separateDialCode: true,
         hiddenInput: 'Mobile',
         preferredCountries: [
            'gb',
            'tr',
            'fr',
            'sa',
            'us',
            'de',
            'se',
            'be',
            'kw',
            'ae',
            'qa',
            'nl',
         ],
         utilsScript:
            'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',

         geoIpLookup: function (callback) {
            // TODO medium security issue - publicly visible api key here!
            fetch(
               'https://api.ipgeolocation.io/ipgeo?apiKey=422275249a7e4de6ab10a264a99114f8&fields=geo'
            )
               .then(function (res) {
                  return res.json()
               })
               .then(function (data) {
                  callback(data?.country_code2 ?? 'us')
               })
               .catch(function (reason) {
                  callback('us')
                  console.error(reason)
               })
         },
      })

      mobileInput.addEventListener('countrychange', function (e) {
         const countryName = itiInstance.getSelectedCountryData().name
         if (countryName) {
            countryInput.value = countryName.replace(/.+\((.+)\)/, '$1')
         }
      })
      setIti(itiInstance)
      return
   }, [mobileInputId, countryInputId])

   return iti
}

export default useIntlTelInput
