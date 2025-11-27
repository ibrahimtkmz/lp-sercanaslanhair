"use client";

import { useEffect, useRef, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      // 1.5 saniye hareketsizlik → popup açılır
      timerRef.current = setTimeout(() => {
        setShow(true);
      }, 1500);
    };

    resetTimer();

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError("Phone number with country code is required.");
      return;
    }

    setError("");

    const message = encodeURIComponent(
      `Hi! I want to check my suitability for hair transplant and get my 30% New Year discount.\n\n` +
      `My WhatsApp number (with country code): ${phone}\n\n` +
      `Please contact me with my personalized offer.`
    );

    window.open(`https://wa.me/905467372284?text=${message}`, "_blank");
  };

  if (!show) return null;

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
          maxWidth: "420px",
          width: "90%",
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          padding: "18px 18px 16px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Kapatma butonu */}
        <button
          onClick={() => setShow(false)}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "8px",
            right: "10px",
            border: "none",
            background: "rgba(0,0,0,0.35)",
            color: "#fff",
            width: "24px",
            height: "24px",
            borderRadius: "999px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* Üst rozet */}
        <div
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
            color: "#0f766e",
            background: "#ecfdf5",
            padding: "4px 10px",
            borderRadius: "999px",
            display: "inline-block",
            marginBottom: "8px",
          }}
        >
          Instant price & suitability
        </div>

        {/* Başlık */}
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "6px",
          }}
        >
          Get Your 30% New Year Discount
        </h3>

        {/* Açıklama */}
        <p
          style={{
            fontSize: "13px",
            color: "#444",
            marginBottom: "14px",
            lineHeight: 1.5,
          }}
        >
          Share your <strong>WhatsApp number with country code</strong> and our
          team will contact you with your{" "}
          <strong>hair transplant suitability</strong> and{" "}
          <strong>30% New Year offer</strong>.
        </p>

        {/* Form – sadece telefon */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label
              htmlFor="phone"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                display: "block",
                marginBottom: "4px",
              }}
            >
              WhatsApp number (with country code){" "}
              <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
              placeholder="+90 5XX XXX XX XX"
              style={{
                width: "100%",
                padding: "9px 11px",
                borderRadius: "10px",
                border: `1px solid ${error ? "#dc2626" : "#d4d4d4"}`,
                fontSize: "13px",
              }}
            />
            {error && (
              <div
                style={{
                  marginTop: "3px",
                  fontSize: "11px",
                  color: "#dc2626",
                }}
              >
                {error}
              </div>
            )}
          </div>

          {/* Gönder butonu */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              background: "#25D366",
              color: "#ffffff",
              marginBottom: "4px",
            }}
          >
            💬 Send me my offer on WhatsApp
          </button>

          <p
            style={{
              marginTop: "2px",
              fontSize: "11px",
              color: "#777",
              textAlign: "center",
            }}
          >
            We will contact you on WhatsApp with your suitability and 30% New Year
            discount.
          </p>
        </form>
      </div>
    </div>
  );
}
