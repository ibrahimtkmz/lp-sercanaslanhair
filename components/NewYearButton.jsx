"use client";

import { useEffect, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I saw your 30% New Year discount. I would like to get more information about the hair transplant offer."
    );

    window.open(`https://wa.me/905467372284?text=${message}`, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9998,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "20px",
          maxWidth: "420px",
          width: "90%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Kapatma butonu */}
        <button
          onClick={() => setShow(false)}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* Resim */}
        <img
          src="/popup-agent.png"
          alt="Patient coordinator"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "999px",
            objectFit: "cover",
            marginBottom: "12px",
          }}
        />

        {/* Başlık & metin (İngilizce) */}
        <h3
          style={{
            fontSize: "22px",
            marginBottom: "6px",
            fontWeight: 700,
          }}
        >
          🎁 Get 30% New Year Discount
        </h3>
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.5,
            marginBottom: "16px",
            color: "#333",
          }}
        >
          Chat with our medical team on WhatsApp and secure your{" "}
          <strong>30% New Year offer</strong> for your hair transplant in
          Turkey.
        </p>

        {/* WhatsApp CTA */}
        <button
          onClick={handleWhatsApp}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "#25D366",
            color: "#ffffff",
          }}
        >
          <span>💬 Chat on WhatsApp</span>
        </button>

        <p
          style={{
            marginTop: "8px",
            fontSize: "11px",
            color: "#777",
          }}
        >
          Your discount message will be sent automatically.
        </p>
      </div>
    </div>
  );
}
