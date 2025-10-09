'use client'

import './styles.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer(props) {
     const { footer, phone_visible } = props
     return (
          <footer
               className={`keep-ltr footer`}
               id="contact"
          >
               <div className="footer-inner">
                    <div className="footer-top">
                         <div className="logo-group">
                              <Link href="#">
                                  <Image
                                                         width={255.5}
                                                         height={66}
                                                         style={{ width: 'auto' }}
                                                         src={'/images/logo-4.png'}
                                                         alt="hair transplant in turkey"
                                                    />
                              </Link>
                         </div>
                         <div className={'address'}>
                              <Link href={'#'}>
                                   <Image
                                        src={'/images/address.svg'}
                                        alt="address"
                                        width={18}
                                        height={24}
                                   />
                                   <span dangerouslySetInnerHTML={{ __html: footer.address }}></span>
                              </Link>
                              <Link href="mailto:info@ceyhunaydogan.com">
                                   <Image
                                        src={'/images/email.svg'}
                                        alt="email"
                                        width={24.8}
                                        height={18.6}
                                   />
                                   <span>{footer.email}</span>
                              </Link>
                              <Link href="#">
                                   <Image
                                        src={'/images/phone.svg'}
                                        alt="phone"
                                        width={24.02}
                                        height={24.02}
                                   />
                                   <span>{phone_visible}</span>
                              </Link>
                         </div>
                    </div>
                    <div className="footer-bottom">
                         <p>{footer.copy}</p>
                    </div>
               </div>
          </footer>
     )
}
