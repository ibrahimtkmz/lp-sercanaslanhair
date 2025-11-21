"use client";
import React from "react";
import Image from "next/image";
import "./styles.css";

export default function WpSticky({ wp_message, phone }) {
  return (
    <a
      // Burası dinamiktir, numarayı HomeClient'tan gelen "phone" verisinden alır.
      href={`https://wa.me/${phone}?text=${wp_message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wp-sticky-container"
    >
      <Image
        src="/images/whatsapp-logo.png" 
        width={60}
        height={60}
        alt="WhatsApp"
        unoptimized
      />
    </a>
  );
}
