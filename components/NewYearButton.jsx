"use client";

import { useEffect, useRef, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    hairLossType: "",
    age: "",
    country: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  // Inactivity -> open popup
  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      // 1.5 seconds inactivity
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

  const hairLossOptions = [
    {
      id: "front",
      label: "Receding hairline",
      desc: "Front / temples",
      icon: "🧑‍🦲",
    },
    {
      id: "crown",
      label: "Crown / vertex",
      desc: "Bald spot on top",
      icon: "🎯",
    },
    {
      id: "diffuse",
      label: "Diffuse thinning",
      desc: "Overall thinning",
      icon: "💨",
    },
    {
      id: "fulltop",
      label: "Advanced hair loss",
      desc: "Full top / Norwood 5+",
      icon: "⚠️",
    },
  ];

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.hairLossType) {
      newErrors.hairLossType = "Please select your hair loss type.";
    }
    if (!form.age) {
      newErrors.age = "Please enter your age.";
    } else if (isNaN(Number(form.age)) || Number(form.age) < 18 || Number(form.age) > 75) {
      newErrors.age = "Please enter a valid age (18–75).";
    }
    if (!form.country.trim()) {
      newErrors.country = "Please enter your country.";
    }
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
    if (step === 2) {
      if (!validateStep2()) return;
    }
    setStep((s) => Math.min(3, s + 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const message = encodeURIComponent(
      `Hi! I just completed the hair transplant donor analysis form.\n\n` +
        `Hair loss type: ${form.hairLossType || "-"}\n` +
        `Age: ${form.age || "-"}\n` +
        `Country: ${form.country || "-"}\n` +
        `WhatsApp number (with country code): ${form.phone}\n\n` +
        `Please check my suitability and send me my 30% New Year discount and exact price on WhatsApp.`
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
          maxWidth: "460px",
          width: "92%",
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          padding: "18px 18px 16px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Close */}
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

        {/* Step indicator */}
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
          Step {step} of 3
        </div>

        {step === 1 && (
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              Free Suitability Check & Exact Price
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#444",
                marginBottom: "12px",
                lineHeight: 1.5,
              }}
            >
              Answer a few quick questions and get your{" "}
              <strong>donor area suitability</strong> and{" "}
              <strong>exact hair transplant price</strong> with{" "}
              <strong>30% New Year discount</strong> directly on WhatsApp.
            </p>

            <ul
              style={{
                fontSize: "12px",
                color: "#374151",
                marginBottom: "14px",
                paddingLeft: "18px",
              }}
            >
              <li>✔ Personalised medical opinion from our team</li>
              <li>✔ Clear graft estimation & recommended technique</li>
              <li>✔ Final price with 30% New Year discount</li>
            </ul>

            <button
              onClick={handleNext}
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 600,
                background: "#0f766e",
                color: "#ffffff",
              }}
            >
              Start my free analysis
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3
              style={{
                fontSize: "19px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              Tell us about your hair loss
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#444",
                marginBottom: "10px",
                lineHeight: 1.5,
              }}
            >
              Choose the option that best matches your{" "}
              <strong>current hair loss</strong>, then enter your{" "}
              <strong>age</strong> and <strong>country</strong>.
            </p>

            {/* Hair loss icons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              {hairLossOptions.map((opt) => {
                const active = form.hairLossType === opt.label;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateField("hairLossType", opt.label)}
                    style={{
                      padding: "8px 8px",
                      borderRadius: "12px",
                      border: active
                        ? "1px solid #0f766e"
                        : "1px solid #e5e7eb",
                      background: active ? "#ecfdf5" : "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontSize: "20px", marginBottom: "2px" }}>
                      {opt.icon}
                    </span>
                    <span style={{ fontWeight: 600 }}>{opt.label}</span>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.hairLossType && (
              <div
                style={{
                  marginBottom: "6px",
                  fontSize: "11px",
                  color: "#dc2626",
                }}
              >
                {errors.hairLossType}
              </div>
            )}

            {/* Age + Country */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "6px",
                marginBottom: "6px",
              }}
            >
              <div style={{ flex: "0 0 30%", textAlign: "left" }}>
                <label
                  htmlFor="age"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "3px",
                  }}
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  placeholder="35"
                  style={{
                    width: "100%",
                    padding: "8px 8px",
                    borderRadius: "10px",
                    border: `1px solid ${
                      errors.age ? "#dc2626" : "#d4d4d4"
                    }`,
                    fontSize: "12px",
                  }}
                />
                {errors.age && (
                  <div
                    style={{
                      marginTop: "2px",
                      fontSize: "10px",
                      color: "#dc2626",
                    }}
                  >
                    {errors.age}
                  </div>
                )}
              </div>

              <div style={{ flex: 1, textAlign: "left" }}>
                <label
                  htmlFor="country"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "3px",
                  }}
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="Germany, UK, USA, Spain..."
                  style={{
                    width: "100%",
                    padding: "8px 8px",
                    borderRadius: "10px",
                    border: `1px solid ${
                      errors.country ? "#dc2626" : "#d4d4d4"
                    }`,
                    fontSize: "12px",
                  }}
                />
                {errors.country && (
                  <div
                    style={{
                      marginTop: "2px",
                      fontSize: "10px",
                      color: "#dc2626",
                    }}
                  >
                    {errors.country}
                  </div>
                )}
              </div>
            </div>

            {/* Nav buttons */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
                onClick={handleBack}
                style={{
                  flex: 1,
                  padding: "9px 10px",
                  borderRadius: "999px",
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                style={{
                  flex: 1.2,
                  padding: "9px 10px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#0f766e",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h3
              style={{
                fontSize: "19px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              Receive your results on WhatsApp
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#444",
                marginBottom: "12px",
                lineHeight: 1.5,
              }}
            >
              Enter your <strong>WhatsApp number with country code</strong>. We
              will send your <strong>suitability result</strong> and{" "}
              <strong>30% New Year discount price</strong> in a private message.
            </p>

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
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+90 5XX XXX XX XX"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "10px",
                  border: `1px solid ${
                    errors.phone ? "#dc2626" : "#d4d4d4"
                  }`,
                  fontSize: "13px",
                }}
              />
              {errors.phone && (
                <div
                  style={{
                    marginTop: "3px",
                    fontSize: "11px",
                    color: "#dc2626",
                  }}
                >
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Nav + WhatsApp */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "8px",
                marginBottom: "4px",
              }}
            >
              <button
                type="button"
                onClick={handleBack}
                style={{
                  flex: 1,
                  padding: "9px 10px",
                  borderRadius: "999px",
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Back
              </button>

              <button
                type="submit"
                style={{
                  flex: 1.4,
                  padding: "11px 12px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#25D366",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                💬 Send my results on WhatsApp
              </button>
            </div>

            <p
              style={{
                marginTop: "2px",
                fontSize: "11px",
                color: "#777",
                textAlign: "center",
              }}
            >
              When you tap the WhatsApp button, we will send all your answers to
              our team and reply with your suitability and exact price.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
