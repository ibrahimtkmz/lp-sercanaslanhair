"use client";
import React from "react";
import Image from "next/image";
import "./styles.css"; // Eğer CSS dosyası buradaysa

export default function WpSticky({ wp_message }) {
  // Numarayı buraya sabitliyoruz
  const fixedPhone = "905467372284";

  return (
    <a
      href={`https://wa.me/${fixedPhone}?text=${wp_message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wp-sticky-container" // Sınıf ismi sizde farklı olabilir, mevcut dosyanızdaki class'ı koruyun
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        cursor: 'pointer'
      }}
    >
      {/* Buradaki Image veya içerik sizin orijinal dosyanızdakiyle aynı olmalı */}
       <Image
        src="/images/whatsapp-logo.png" // Sizin görsel yolunuz farklı olabilir, kontrol edin
        width={60}
        height={60}
        alt="WhatsApp"
      />
    </a>
  );
}
