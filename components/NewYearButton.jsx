"use client";

import { useEffect, useRef, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Kullanıcı 5 saniye hareketsiz kalırsa popup aç
      timerRef.current = setTimeout(() => {
        setShow(true);
      }, 5000);
    };

    // Sayfa açıldığında ilk timer başlasın
    resetTimer();

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
    };
  }, []);

  if (!show) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I saw your 30% New Year discount. I would like to get more information about the hair transplant offer and your before/after results."
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
          borderRadius: "20px",
          maxWidth: "480px",
          width: "90%",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          overflow: "hidden",
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
            background: "rgba(0,0,0,0.35)",
            color: "#fff",
            width: "26px",
            height: "26px",
            borderRadius: "999px",
            fontSize: "18px",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          ×
        </button>

        {/* Before–After görseli */}
        <img
          src="/popup-agent.png"
          alt="Hair transplant before and after"
          style={{
            width: "100%",
            display: "block",
          }}
        />

        {/* Metin ve CTA */}
        <div
          style={{
            padding: "18px 20px 20px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "22px",
              marginBottom: "6px",
              fontWeight: 700,
            }}
          >
            🎁 Don&apos;t Miss This Transformation!
          </h3>

          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.5,
              marginBottom: "16px",
              color: "#333",
            }}
          >
            See the real{" "}
            <strong>Before &amp; After</strong> results and secure your{" "}
            <strong>30% New Year discount</strong> on hair transplant in Turkey.
          </p>

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
              marginBottom: "6px",
            }}
          >
            💬 Chat on WhatsApp &amp; Claim 30% Off
          </button>

          <p
            style={{
              marginTop: "2px",
              fontSize: "11px",
              color: "#777",
            }}
          >
            Your discount message will be sent automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
