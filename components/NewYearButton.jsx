"use client";

import { useEffect, useRef, useState } from "react";

export default function NewYearButton() {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    hairLossArea: "",
    donorType: "",
    previousTransplant: "no",
  });

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!form.hairLossArea) {
      newErrors.hairLossArea = "Please select your hair loss area.";
    }
    if (!form.donorType) {
      newErrors.donorType = "Please select your donor type.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const message = encodeURIComponent(
      `Hi! I just completed the donor area analysis form.\n\n` +
      `Name: ${form.name || "-"}\n` +
      `Phone: ${form.phone}\n` +
      `Hair loss area: ${form.hairLossArea}\n` +
      `Donor type: ${form.donorType}\n` +
      `Previous hair transplant: ${form.previousTransplant === "yes" ? "Yes" : "No"}\n\n` +
      `Please check my suitability and send me a personalized price quote for hair transplant.`
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
          borderRadius: "20px",
          maxWidth: "520px",
          width: "92%",
          maxHeight: "90vh",
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
            zIndex: 10,
          }}
        >
          ×
        </button>

        {/* Üst görsel (before/after) – istersen kaldırabilirsin */}
        <img
          src="/popup-agent.png"
          alt="Hair transplant before and after"
          style={{
            width: "100%",
            display: "block",
          }}
        />

        {/* İçerik */}
        <div
          style={{
            padding: "18px 20px 20px",
            overflowY: "auto",
            maxHeight: "calc(90vh - 180px)",
          }}
        >
          {/* Üst bilgi badge + başlık */}
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
            Instant suitability & pricing
          </div>

          <h3
            style={{
              fontSize: "22px",
              fontWeight: 700,
              marginBottom: "6px",
            }}
          >
            Free Donor Area Analysis
          </h3>

          <p
            style={{
              fontSize: "13px",
              color: "#444",
              marginBottom: "16px",
              lineHeight: 1.5,
            }}
          >
            Answer a few quick questions and our medical team will check your{" "}
            <strong>donor area suitability</strong> and send you a{" "}
            <strong>personalized hair transplant price</strong> on WhatsApp.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "10px", textAlign: "left" }}>
              <label
                htmlFor="name"
                style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "4px" }}
              >
                Full name (optional)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "10px",
                  border: "1px solid #d4d4d4",
                  fontSize: "13px",
                }}
              />
            </div>

            {/* Phone (required) */}
            <div style={{ marginBottom: "10px", textAlign: "left" }}>
              <label
                htmlFor="phone"
                style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "4px" }}
              >
                Phone number <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+90 5XX XXX XX XX"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "10px",
                  border: `1px solid ${errors.phone ? "#dc2626" : "#d4d4d4"}`,
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

            {/* Hair loss area */}
            <div style={{ marginBottom: "10px", textAlign: "left" }}>
              <label
                htmlFor="hairLossArea"
                style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "4px" }}
              >
                Where is your main hair loss area? <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <select
                id="hairLossArea"
                name="hairLossArea"
                value={form.hairLossArea}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "10px",
                  border: `1px solid ${errors.hairLossArea ? "#dc2626" : "#d4d4d4"}`,
                  fontSize: "13px",
                  background: "#ffffff",
                }}
              >
                <option value="">Select an option</option>
                <option value="Front hairline / temples">Front hairline / temples</option>
                <option value="Crown / vertex">Crown / vertex</option>
                <option value="Front + crown (full top)">Front + crown (full top)</option>
                <option value="Beard area">Beard area</option>
              </select>
              {errors.hairLossArea && (
                <div
                  style={{
                    marginTop: "3px",
                    fontSize: "11px",
                    color: "#dc2626",
                  }}
                >
                  {errors.hairLossArea}
                </div>
              )}
            </div>

            {/* Donor type */}
            <div style={{ marginBottom: "10px", textAlign: "left" }}>
              <label
                htmlFor="donorType"
                style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "4px" }}
              >
                How would you describe your donor area (back of the head)?{" "}
                <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <select
                id="donorType"
                name="donorType"
                value={form.donorType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "10px",
                  border: `1px solid ${errors.donorType ? "#dc2626" : "#d4d4d4"}`,
                  fontSize: "13px",
                  background: "#ffffff",
                }}
              >
                <option value="">Select an option</option>
                <option value="Thick, dense hair">Thick, dense hair</option>
                <option value="Medium density">Medium density</option>
                <option value="Thin, weak hair">Thin, weak hair</option>
                <option value="Already partially used in previous surgery">
                  Already partially used in previous surgery
                </option>
              </select>
              {errors.donorType && (
                <div
                  style={{
                    marginTop: "3px",
                    fontSize: "11px",
                    color: "#dc2626",
                  }}
                >
                  {errors.donorType}
                </div>
              )}
            </div>

            {/* Previous transplant */}
            <div style={{ marginBottom: "14px", textAlign: "left" }}>
              <label
                style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "4px" }}
              >
                Have you had a hair transplant before?
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  fontSize: "13px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, previousTransplant: "no" }))
                  }
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: "999px",
                    border:
                      form.previousTransplant === "no"
                        ? "1px solid #0f766e"
                        : "1px solid #d4d4d4",
                    background:
                      form.previousTransplant === "no" ? "#ecfdf5" : "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, previousTransplant: "yes" }))
                  }
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: "999px",
                    border:
                      form.previousTransplant === "yes"
                        ? "1px solid #0f766e"
                        : "1px solid #d4d4d4",
                    background:
                      form.previousTransplant === "yes" ? "#ecfdf5" : "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Yes
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 16px",
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
              📩 Get my suitability & price on WhatsApp
            </button>

            <p
              style={{
                marginTop: "4px",
                fontSize: "11px",
                color: "#777",
                textAlign: "center",
              }}
            >
              Your answers and phone number will be sent to our medical team via WhatsApp.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
