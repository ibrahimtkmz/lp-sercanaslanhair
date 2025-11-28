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

  // Inactivity -> open popup in 2.5s
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
    if (!form.phone.trim()) {
      newErrors.phone = "WhatsApp number with country code is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

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
          width: "94%",
          maxWidth: "640px", // <-- YATAYDA GENİŞ
          padding: "20px 24px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
        }}
      >
        {/* Close */}
        <button
          onClick={() => setShow(false)}
          style={{
            position: "absolute",
            top: 10,
            right: 14,
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.35)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ×
        </button>

        {/* Step badge */}
        <div
          style={{
            fontSize: 11,
            background: "#ecfdf5",
            color: "#0f766e",
            padding: "4px 10px",
            borderRadius: 20,
            fontWeight: 600,
            marginBottom: 12,
            display: "inline-block",
          }}
        >
          Step {step} of 3
        </div>

        {/* STEP 1 (değişmedi) */}
        {step === 1 && (
          <div>
            <div
              style={{
                margin: "0 auto 14px",
                width: "60%",
                maxWidth: 260,
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 5px 18px rgba(0,0,0,0.18)",
              }}
            >
              <img
                src="/popup-agent.png"
                alt="Hair transplant before and after"
                style={{ width: "100%", display: "block" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(5, 150, 105, 0.08)",
                border: "1px solid rgba(5,150,105,0.35)",
                color: "#065f46",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 14,
              }}
            >
              <span role="img" aria-label="gift">
                🎁
              </span>
              <span>
                Get <span style={{ fontSize: 16 }}>30% New Year Discount</span> on
                your package
              </span>
            </div>

            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 10,
                color: "#111827",
              }}
            >
              Don’t Miss Your Hair Transformation
            </h3>

            <p
              style={{
                fontSize: 15,
                textAlign: "center",
                color: "#444",
                marginBottom: 16,
                lineHeight: 1.55,
              }}
            >
              Get a quick <strong>donor suitability check</strong> and receive your{" "}
              <strong style={{ color: "#0f766e" }}>
                exact price with a 30% New Year discount
              </strong>{" "}
              at the end of this short analysis.
            </p>

            <ul
              style={{
                fontSize: 14,
                color: "#374151",
                paddingLeft: 20,
                marginBottom: 18,
                lineHeight: 1.5,
              }}
            >
              <li>✔ Donor area suitability check</li>
              <li>✔ Estimated graft requirement</li>
              <li>✔ Recommended technique</li>
              <li>✔ Final discounted price instantly delivered</li>
            </ul>

            <button
              onClick={handleNext}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 700,
                background: "#0f766e",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                transition: "all 0.25s ease",
                animation: "pulseBtn 1.5s infinite ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(15,118,110,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.12)";
              }}
            >
              Start My Free Analysis
            </button>
          </div>
        )}

        {/* STEP 2 – 3 sütunlu, daha yatay layout */}
        {step === 2 && (
          <div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 8,
                color: "#111827",
              }}
            >
              Tell us about your hair loss
            </h3>

            <p
              style={{
                fontSize: 14,
                color: "#444",
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              Select your <strong>hair loss type</strong>, then enter your{" "}
              <strong>age</strong> and <strong>country</strong>.
            </p>

            {/* 3 columns → daha kısa yükseklik */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 10,
                marginBottom: 10,
              }}
            >
              {hairLossOptions.map((o) => {
                const active = form.hairLossType === o.label;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => updateField("hairLossType", o.label)}
                    style={{
                      padding: "8px 8px 10px",
                      borderRadius: 14,
                      border: active ? "2px solid #0f766e" : "1px solid #e5e7eb",
                      background: active ? "#ecfdf5" : "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={o.img}
                      alt={o.label}
                      style={{
                        width: 68,
                        height: 68,
                        objectFit: "contain",
                        marginBottom: 4,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#111827",
                        marginBottom: 2,
                      }}
                    >
                      {o.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{o.desc}</div>
                  </button>
                );
              })}
            </div>

            {errors.hairLossType && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                {errors.hairLossType}
              </div>
            )}

            {/* Age + Country row */}
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 10,
                marginTop: 4,
              }}
            >
              <div style={{ flex: 0.8 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Age
                </label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  placeholder="35"
                  style={{
                    width: "100%",
                    padding: "9px 10px",
                    borderRadius: 10,
                    border: errors.age ? "1px solid #dc2626" : "1px solid #d1d5db",
                    fontSize: 13,
                  }}
                />
                {errors.age && (
                  <div style={{ fontSize: 11, color: "#dc2626", marginTop: 2 }}>
                    {errors.age}
                  </div>
                )}
              </div>

              <div style={{ flex: 1.4 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Country
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="Germany, UK, USA..."
                  style={{
                    width: "100%",
                    padding: "9px 10px",
                    borderRadius: 10,
                    border: errors.country
                      ? "1px solid #dc2626"
                      : "1px solid #d1d5db",
                    fontSize: 13,
                  }}
                />
                {errors.country && (
                  <div style={{ fontSize: 11, color: "#dc2626", marginTop: 2 }}>
                    {errors.country}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                style={{
                  flex: 1.3,
                  padding: "10px",
                  borderRadius: 999,
                  border: "none",
                  background: "#0f766e",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 8,
                color: "#111827",
              }}
            >
              Receive your results on WhatsApp
            </h3>

            <p
              style={{
                fontSize: 14,
                color: "#444",
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              Enter your <strong>WhatsApp number with country code</strong>. We
              will send your suitability result and your{" "}
              <strong>30% New Year discounted price</strong>.
            </p>

            <label
              style={{
                fontSize: 13,
                fontWeight: 600,
                display: "block",
                marginBottom: 4,
              }}
            >
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
                borderRadius: 10,
                border: errors.phone ? "1px solid #dc2626" : "1px solid #d1d5db",
                fontSize: 14,
                marginBottom: 6,
              }}
            />
            {errors.phone && (
              <div style={{ fontSize: 11, color: "#dc2626", marginBottom: 4 }}>
                {errors.phone}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Back
              </button>
              <button
                type="submit"
                style={{
                  flex: 1.4,
                  padding: "12px",
                  borderRadius: 999,
                  border: "none",
                  background: "#25D366",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                💬 Send My Results
              </button>
            </div>

            <p
              style={{
                marginTop: 8,
                fontSize: 11,
                color: "#777",
                textAlign: "center",
              }}
            >
              When you tap the WhatsApp button, we’ll send all your answers to our
              team and reply with your suitability and exact price.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
