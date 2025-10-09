import Image from 'next/image'
import './styles.css'
import { useState } from 'react'
import WpLink from '../wp'

export default function Faq({ faq, phone, wp_message }) {
     const [active, setActive] = useState(0)
     return (
          <section
               className="faq"
               id="faq"
          >
               <div className="faq-inner">
                    <div className="faq-content">
                         <h2 dangerouslySetInnerHTML={{ __html: faq.title }} />
                         <ul>
                              {faq.all_questions.map((item, i) => {
                                   return (
                                        <li
                                             key={i}
                                             className={active === i ? 'active' : ''}
                                        >
                                             <button
                                                  className="faq-question"
                                                  onClick={() => setActive(i)}
                                             >
                                                  <div className="faq-plus">{active === i ? '+' : '-'}</div>
                                                  <h3 dangerouslySetInnerHTML={{ __html: item.question }} />
                                             </button>
                                             <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        </li>
                                   )
                              })}
                         </ul>
                         <WpLink
                              title={faq.button}
                              phone={phone}
                              wp_message={wp_message}
                         />
                    </div>
                    <div className="faq-img">
                         <img
                              src={'/images/f.webp'}
                              alt="Hair transplant in Turkey"
                         />
                    </div>
               </div>
          </section>
     )
}
