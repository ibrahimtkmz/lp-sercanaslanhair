"use client";

import { useEffect, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);
  let inactivityTimer;

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setShow(true);
      }, 5000); // 5 seconds inactivity
    };

    // Kullanıcının aktivitesini takip et
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // Başlangıçta timer başlasın
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
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
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9998,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: "18px",
          padding: "20px",
          maxWidth: "420px",
          width: "90%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          textAlign: "center",
        }}
      >
        {/* Kapatma */}
        <button
          onClick={() => setShow(false)}
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
          alt="Hair Transplant Before After"
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "12px",
          }}
        />

        <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "6px" }}>
          🎁 Get 30% New Year Discount
        </h3>

        <p style={{ fontSize: "14px", marginBottom: "16px", color: "#333" }}>
          Chat with our medical team and secure your <strong>30% New Year offer</strong>.
        </p>

        <button
          onClick={handleWhatsApp}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "999px",
            background: "#25D366",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          💬 Chat on WhatsApp
        </button>

        <p style={{ marginTop: "8px", fontSize: "11px", color: "#777" }}>
          Your discount message will be sent automatically.
        </p>
      </div>
    </div>
  );
}
