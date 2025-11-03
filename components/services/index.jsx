import { usePathname } from 'next/navigation'
import WpLink from '../wp'
import './styles.css'
import Image from 'next/image'

export default function Service({ services, wp_message, phone }) {
     const pathname = usePathname() // aktif URL'i alır

     // Eğer URL /dental-treatment-in-turkey ise farklı görsel kullan
     const imageSrc =
          pathname === '/dental-treatment-in-turkey'
               ? '/images/dental-care.jpg'
               : '/images/service.png'

     return (
          <section className="services" id="services">
               <div className="services-inner">
                    <h2 dangerouslySetInnerHTML={{ __html: services.title }} />
                    <div className="services-content">
                         <div className="services-image">
                              <Image
                                   src={imageSrc}
                                   alt="services"
                                   width={400}
                                   height={400}
                                   quality={60}
                              />
                              <WpLink
                                   title={services.button}
                                   phone={phone}
                                   wp_message={wp_message}
                              />
                         </div>
                         <ul className="services-list">
                              {services.all_services.map((service, i) => (
                                   <li key={i}>
                                        <h3 dangerouslySetInnerHTML={{ __html: service.title }} />
                                        <p dangerouslySetInnerHTML={{ __html: service.description }} />
                                   </li>
                              ))}
                         </ul>
                    </div>
               </div>
          </section>
     )
}
