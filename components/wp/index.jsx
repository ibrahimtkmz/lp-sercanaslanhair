'use client'
import './styles.css'
import Image from 'next/image'

// "phone" yanına eşittir koyarak varsayılan numarayı yazıyoruz.
// Böylece yukarıdan veri gelmese bile (undefined olsa bile) bu numara devreye girer.
export default function WpLink({ title, wp_message, phone = "905467372284" }) {
     return (
          <a
               className="wp-link"
               href={`https://wa.me/${phone}?text=${wp_message}`}
          >
               <Image
                    src={'/images/button-arrow.png'}
                    width={52}
                    height={52}
                    alt="wp button arrow"
                    unoptimized
               />
               <span>{title}</span>
          </a>
     )
}
