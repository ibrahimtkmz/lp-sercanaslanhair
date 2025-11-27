"use client";

import { useEffect, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => {
        // Kullanıcı nereye gitsin istiyorsan burayı değiştir
        // Örnek: form id'si #lead-form ise:
        // window.location.href = "#lead-form";
        window.location.href = "#pricing";
      }}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#e60023",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: "10px",
        fontSize: "17px",
        fontWeight: "600",
        cursor: "pointer",
        zIndex: 9999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      }}
    >
      🎁 Get 30% New Year Discount!
    </button>
  );
}
