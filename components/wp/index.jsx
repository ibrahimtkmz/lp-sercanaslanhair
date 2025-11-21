'use client'
import './styles.css'
import Image from 'next/image'

export default function WpLink({ title, wp_message, phone }) {
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
