"use client";

import { useEffect, useRef, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    hairLossType: "",
    age: "",
    country: "",
    phone: "",
  });

  const timerRef = useRef(null);

  // ───────────────────────────────────────────────
  // INACTIVITY → OPEN POPUP (1.5 SN)
  // ───────────────────────────────────────────────
  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShow(true), 1500);
    };

    resetTimer();
    const events = ["mousemove", "scroll", "touchstart", "keydown"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, []);

  // ───────────────────────────────────────────────
  // NORWOOD ICON OPTIONS
  // ───────────────────────────────────────────────
  const hairLossOptions = [
    { id: 1, label: "Norwood 1", desc: "Minimal recession", img: "/norwood-1.png" },
    { id: 2, label: "Norwood 2", desc: "Early recession", img: "/norwood-2.png" },
    { id: 3, label: "Norwood 3", desc: "Front loss", img: "/norwood-3.png" },
    { id: 4, label: "Norwood 4", desc: "Front + crown", img: "/norwood-4.png" },
    { id: 5, label: "Norwood 5", desc: "Front + larger crown", img: "/norwood-5.png" },
    { id: 6, label: "Norwood 6", desc: "Full top thinning", img: "/norwood-6.png" },
    { id: 7, label: "Norwood 7", desc: "Advanced baldness", img: "/norwood-7.png" },
  ];

  const updateField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  // ───────────────────────────────────────────────
  // VALIDATION
  // ───────────────────────────────────────────────
  const validateStep2 = () => {
    const newErrors = {};
    if (!form.hairLossType) newErrors.hairLossType = "Please select your hair loss type.";
    if (!form.age) newErrors.age = "Please enter your age.";
    if (!form.country.trim()) newErrors.country = "Please enter your country.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!form.phone.trim())
      newErrors.phone = "WhatsApp number with country code is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ───────────────────────────────────────────────
  // NAVIGATION
  // ───────────────────────────────────────────────
  const handleNext = () => {
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  // ───────────────────────────────────────────────
  // FINAL SUBMIT → WhatsApp
  // ───────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const message = encodeURIComponent(
      `Hi! I completed the donor analysis form.\n\n` +
        `Hair loss type: ${form.hairLossType}\n` +
        `Age: ${form.age}\n` +
        `Country: ${form.country}\n` +
        `Phone (with country code): ${form.phone}\n\n` +
        `Please send me my suitability results and my 30% New Year discounted price.`
    );

    window.open(`https://wa.me/905467372284?text=${message}`, "_blank");
  };

  if (!show) return null;

  // ───────────────────────────────────────────────
  // POPUP LAYOUT
  // ───────────────────────────────────────────────
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: "18px",
          width: "92%",
          maxWidth: "480px",
          padding: "20px",
          fontFamily: "system-ui",
          boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShow(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            border: "none",
            background: "rgba(0,0,0,0.35)",
            color: "#fff",
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ×
        </button>

        {/* STEP BADGE */}
        <div
          style={{
            fontSize: "11px",
            background: "#ecfdf5",
            color: "#0f766e",
            padding: "4px 10px",
            borderRadius: "20px",
            fontWeight: "600",
            marginBottom: "12px",
            display: "inline-block",
          }}
        >
          Step {step} of 3
        </div>

        {/* ───────────────────────────────────────────────
            STEP 1 — BEFORE/AFTER + ÇARPI CI %30 İNDİRİM
        ─────────────────────────────────────────────── */}
        {step === 1 && (
          <div>
            {/* Küçük görsel */}
            <div
              style={{
                margin: "0 auto 14px",
                width: "70%",
                maxWidth: "260px",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 5px 18px rgba(0,0,0,0.18)",
              }}
            >
              <img
                src="/popup-agent.png"
                style={{ width: "100%", display: "block" }}
              />
            </div>

            {/* Büyük & Çarpıcı %30 İndirim Banner */}
            <div
              style={{
                background: "linear-gradient(135deg,#0f766e,#059669)",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "800",
                padding: "10px 16px",
                borderRadius: "12px",
                textAlign: "center",
                marginBottom: "14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
              }}
            >
              🎁 Get <span style={{ fontSize: "22px" }}>30% New Year Discount</span>
            </div>

            <h3
              style={{
                fontSize: "22px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Don’t Miss Your Hair Transformation
            </h3>

            <p
              style={{
                fontSize: "15px",
                textAlign: "center",
                color: "#444",
                marginBottom: "16px",
                lineHeight: "1.55",
              }}
            >
              Get a quick <strong>donor suitability check</strong> and receive your{" "}
              <strong style={{ color: "#0f766e" }}>
                exact price with a 30% New Year discount
              </strong>
              .
            </p>

            <ul
              style={{
                fontSize: "14px",
                color: "#374151",
                paddingLeft: "20px",
                marginBottom: "18px",
                lineHeight: "1.5",
              }}
            >
              <li>✔ Donor area suitability check</li>
              <li>✔ Estimated graft requirement</li>
              <li>✔ Recommended technique</li>
              <li>
                ✔ <strong>Final discounted price</strong> instantly delivered
              </li>
            </ul>

            <button
              onClick={handleNext}
              style={{
                width: "100%",
                padding: "12px",
                background: "#0f766e",
                color: "#fff",
                borderRadius: "999px",
                border: "none",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Start My Free Analysis
            </button>
          </div>
        )}

        {/* ───────────────────────────────────────────────
            STEP 2 — NORWOOD TYPES + AGE + COUNTRY
        ─────────────────────────────────────────────── */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
              Tell us about your hair loss
            </h3>

            <p style={{ fontSize: "14px", color: "#444", marginBottom: "12px" }}>
              Select your <strong>hair loss type</strong>, then enter your{" "}
              <strong>age</strong> and <strong>country</strong>.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              {hairLossOptions.map((o) => {
                const active = form.hairLossType === o.label;
                return (
                  <button
                    key={o.id}
                    onClick={() => updateField("hairLossType", o.label)}
                    type="button"
                    style={{
                      borderRadius: "12px",
                      border: active ? "2px solid #0f766e" : "1px solid #ddd",
                      padding: "8px 6px",
                      background: active ? "#ecfdf5" : "#fff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={o.img}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                        marginBottom: "4px",
                      }}
                    />
                    <div style={{ fontSize: "12px", fontWeight: 600 }}>{o.label}</div>
                    <div style={{ fontSize: "10px", color: "#666" }}>{o.desc}</div>
                  </button>
                );
              })}
            </div>

            {errors.hairLossType && (
              <div style={{ color: "#dc2626", fontSize: "11px", marginBottom: "6px" }}>
                {errors.hairLossType}
              </div>
            )}

            {/* AGE + COUNTRY */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "12px", fontWeight: 600 }}>Age</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  placeholder="35"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "10px",
                    border: errors.age ? "1px solid #dc2626" : "1px solid #ccc",
                    fontSize: "13px",
                  }}
                />
                {errors.age && (
                  <div style={{ fontSize: "11px", color: "#dc2626" }}>{errors.age}</div>
                )}
              </div>

              <div style={{ flex: 2 }}>
                <label style={{ fontSize: "12px", fontWeight: 600 }}>Country</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="Germany, UK, USA..."
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "10px",
                    border: errors.country ? "1px solid #dc2626" : "1px solid #ccc",
                    fontSize: "13px",
                  }}
                />
                {errors.country && (
                  <div style={{ fontSize: "11px", color: "#dc2626" }}>
                    {errors.country}
                  </div>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleBack}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "999px",
                  border: "1px solid #ddd",
                  background: "#fff",
                }}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                style={{
                  flex: 1.3,
                  padding: "10px",
                  borderRadius: "999px",
                  background: "#0f766e",
                  border: "none",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────
            STEP 3 — PHONE → WHATSAPP
        ─────────────────────────────────────────────── */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
              Receive your results on WhatsApp
            </h3>

            <p style={{ fontSize: "14px", color: "#444", marginBottom: "14px" }}>
              Enter your <strong>WhatsApp number with country code</strong> to get
              your suitability result and your{" "}
              <strong>30% New Year discounted price</strong>.
            </p>

            {/* PHONE FIELD */}
            <label style={{ fontSize: "13px", fontWeight: 600 }}>
              WhatsApp number (with country code)
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+90 5XX XXX XX XX"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "4px",
                borderRadius: "10px",
                border: errors.phone ? "1px solid #dc2626" : "1px solid #ccc",
                fontSize: "14px",
                marginBottom: "6px",
              }}
            />
            {errors.phone && (
              <div style={{ fontSize: "11px", color: "#dc2626" }}>{errors.phone}</div>
            )}

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <button
                onClick={handleBack}
                type="button"
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "999px",
                  border: "1px solid #ddd",
                }}
              >
                Back
              </button>

              <button
                type="submit"
                style={{
                  flex: 1.4,
                  padding: "12px",
                  borderRadius: "999px",
                  background: "#25D366",
                  border: "none",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                💬 Send My Results
              </button>
            </div>

            <p
              style={{
                marginTop: "8px",
                fontSize: "11px",
                color: "#777",
                textAlign: "center",
              }}
            >
              We will send your complete analysis & discounted price via WhatsApp.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
