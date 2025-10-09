import Image from 'next/image'
import './styles.css'
import Link from 'next/link'

export default function Header({ header }) {
     return (
          <header className="header">
               <div className="header-inner">
                    <Image
                         priority={true}
                         width={255.5}
                         height={66}
                         style={{ width: 'auto' }}
                         src={'/images/logo-4.png'}
                         alt="hair transplant in turkey"
                    />
                    <nav>
                         <ul>
                              {Object.entries(header.links).map((el, index) => {
                                   return (
                                        <li key={index}>
                                             <Link href={`#${el[0]}`}>{el[1]}</Link>
                                        </li>
                                   )
                              })}
                         </ul>
                    </nav>
               </div>
          </header>
     )
}
