import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './styles.css'
import WpLink from '../wp'

export default function Journey({ journey, wp_message, phone }) {
     return (
          <section
               id="journey"
               className="journey"
          >
               <div className="journey-inner">
                    <article>
                         <h2 dangerouslySetInnerHTML={{ __html: journey.title }} />
                         <p dangerouslySetInnerHTML={{ __html: journey.subtitle }} />
                    </article>
                    <JourneySteps steps={journey.steps} />
                    <WpLink
                         wp_message={wp_message}
                         phone={phone}
                         title={journey.button}
                    />
               </div>
          </section>
     )
}

function JourneySteps({ steps }) {
     const ref = useRef(null)
     const inView = useInView(ref)

     return (
          <ul
               ref={ref}
               className={`journey-content-desktop ${inView ? 'active' : ''}`}
          >
               {steps.map((item, index) => {
                    return (
                         <li key={index}>
                              <p dangerouslySetInnerHTML={{ __html: item }} />
                         </li>
                    )
               })}
          </ul>
     )
}
