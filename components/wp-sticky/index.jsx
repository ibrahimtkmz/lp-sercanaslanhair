"use client";
import React from "react";
import Image from "next/image";
// Eğer CSS dosyanız varsa importu burada kalsın, yoksa silebilirsiniz:

export default function WpSticky({ wp_message, phone }) {
  
  // 1. Öncelik: HomeClient'tan gelen numara
  // 2. Öncelik: Gelmezse buradaki numara (Yedek)
  const finalPhone = phone || "905467372284";

  return (
    <div className="wp-sticky-container">
      <a
        href={`https://wa.me/${finalPhone}?text=${wp_message}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
            // Eğer CSS dosyanız bozuksa diye butonun sağ altta kalmasını garanti ediyoruz
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'block',
            cursor: 'pointer'
        }}
      >
        <Image
          // DİKKAT: Sizin projenizdeki WhatsApp logo görselinin adı neyse onu yazın.
          // Genelde: "/images/whatsapp.png" veya "/images/wp-logo.png" olur.
          src="/images/whatsapp.png" 
          width={60}
          height={60}
          alt="WhatsApp"
          unoptimized
        />
      </a>
    </div>
  );
}
