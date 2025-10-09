'use client'
import Image from 'next/image'
import WpLink from '../wp'
import './styles.css'
import useWindowWidth from '@/hooks/useWindowWidth'
import Form from '../form'

export default function Why({ why, phone, wp_message, form, lead }) {
     const windowWidth = useWindowWidth()
     return (
          <section
               className="why"
               id="why"
          >
               <div className="why-inner">
                    <div className="why-left">
                         <h2 dangerouslySetInnerHTML={{ __html: why.title }} />
                         <p dangerouslySetInnerHTML={{ __html: why.description }} />
                         <ul className="why-content">
                              {why.offerings.map((item, i) => {
                                   return (
                                        <li key={i}>
                                             <Image
                                                  width={36}
                                                  height={36}
                                                  src={'/images/tick.svg'}
                                                  alt={item}
                                             />
                                             <p dangerouslySetInnerHTML={{ __html: item }} />
                                        </li>
                                   )
                              })}
                         </ul>
                         <WpLink
                              title={why.button}
                              wp_message={wp_message}
                              phone={phone}
                         />
                    </div>
                    {windowWidth >= 900 && (
                         <div className="why-form">
                              <Form
                                   country="country2"
                                   phone="phone2"
                                   form={form}
                                   lead={lead}
                                   title={form.title2}
                              />
                         </div>
                    )}
               </div>
          </section>
     )
}
