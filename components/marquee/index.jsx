import Image from 'next/image'
import './styles.css'
import Marquee from 'react-fast-marquee'

export default function ReactMarquee() {
     return (
          <section className="marquee">
               <Marquee
                    gradient={true}
                    gradientColor="#120f0f"
               >
                    <div className="marquee-1">
                         <Image
                              src={'/images/logo-1.webp'}
                              width={340}
                              height={61}
                              alt="ministry of healt"
                         />
                    </div>
                    <div className="marquee-2">
                         <Image
                              src={'/images/logo-2.webp'}
                              width={170}
                              height={144}
                              alt="covidien"
                         />
                    </div>
                    <div className="marquee-3">
                         <Image
                              className={'marquee-3'}
                              src={'/images/logo-3.webp'}
                              width={262}
                              height={96}
                              alt="ifs"
                         />
                    </div>
               </Marquee>
          </section>
     )
}
