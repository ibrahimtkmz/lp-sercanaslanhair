'use client'
import Lottie from 'lottie-react'

export default function LottieComponent({ animation }) {
     return (
          <>
               <Lottie
                    animationData={animation}
                    loop={true}
               />
          </>
     )
}
