'use client'
import LottieComponent from '../lottie'
import WpLink from '../wp'
import animation from '@/public/animation/kcal.json'
import './styles.css'

export default function Healthy({ healthy, phone, wp_message }) {
     return (
          <section className="healthy">
               <div className="healthy-inner">
                    <div className="healthy-animation">
                         <LottieComponent animation={animation} />
                    </div>
                    <h2 dangerouslySetInnerHTML={{ __html: healthy.title }} />
                    <p dangerouslySetInnerHTML={{ __html: healthy.description }} />
                    <WpLink
                         phone={phone}
                         wp_message={wp_message}
                         title={healthy.button}
                    />
               </div>
          </section>
     )
}
