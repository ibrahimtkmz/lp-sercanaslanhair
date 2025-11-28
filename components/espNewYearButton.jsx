"use client";

import { useEffect, useRef, useState } from "react";

export default function NewYearButtonEs() {
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

  // Popup después de 2.5s sin actividad
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
    { id: 1, label: "Norwood 1", desc: "Retroceso mínimo", img: "/norwood-1.png" },
    { id: 2, label: "Norwood 2", desc: "Retroceso temprano", img: "/norwood-2.png" },
    { id: 3, label: "Norwood 3", desc: "Pérdida frontal", img: "/norwood-3.png" },
    { id: 4, label: "Norwood 4", desc: "Frente + coronilla", img: "/norwood-4.png" },
    { id: 5, label: "Norwood 5", desc: "Frente + coronilla avanzada", img: "/norwood-5.png" },
    { id: 6, label: "Norwood 6", desc: "Adelgazamiento total superior", img: "/norwood-6.png" },
    { id: 7, label: "Norwood 7", desc: "Calvicie avanzada", img: "/norwood-7.png" },
  ];

  const updateField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.hairLossType) newErrors.hairLossType = "Por favor selecciona tu tipo de calvicie.";
    if (!form.age) newErrors.age = "Por favor ingresa tu edad.";
    if (!form.country.trim()) newErrors.country = "Por favor ingresa tu país.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!form.phone.trim()) {
      newErrors.phone = "Se requiere un número de WhatsApp con código de país.";
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
      `Hola! Acabo de completar el formulario de análisis de área donante.\n\n` +
        `Tipo de calvicie: ${form.hairLossType}\n` +
        `Edad: ${form.age}\n` +
        `País: ${form.country}\n` +
        `Teléfono (WhatsApp): ${form.phone}\n\n` +
        `Por favor envíenme mis resultados de idoneidad y mi precio final con el 30% de descuento de Año Nuevo.`
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
          maxWidth: "640px",
          padding: "20px 24px",
          fontFamily: "system-ui",
          boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
        }}
      >
        {/* Cerrar */}
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

        {/* Etiqueta de paso */}
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
          Paso {step} de 3
        </div>

        {/* Paso 1 */}
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
                alt="Antes y Después"
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
                background: "rgba(5,150,105,0.08)",
                border: "1px solid rgba(5,150,105,0.35)",
                color: "#065f46",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 14,
              }}
            >
              🎁 Obtén un 30% de Descuento de Año Nuevo
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
              No te pierdas tu transformación capilar
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
              Realiza una rápida <strong>evaluación de tu área donante</strong> y
              recibe tu{" "}
              <strong style={{ color: "#0f766e" }}>
                precio exacto con un 30% de descuento de Año Nuevo
              </strong>{" "}
              al finalizar este breve análisis.
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
              <li>✔ Evaluación de la zona donante</li>
              <li>✔ Estimación del número de injertos</li>
              <li>✔ Técnica recomendada</li>
              <li>✔ Precio final con descuento entregado al instante</li>
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
                transition: "all 0.25s ease",
              }}
            >
              Iniciar mi análisis gratuito
            </button>
          </div>
        )}

        {/* Paso 2 */}
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
              Cuéntanos sobre tu pérdida de cabello
            </h3>

            <p
              style={{
                fontSize: 14,
                color: "#444",
                marginBottom: 14,
              }}
            >
              Selecciona tu <strong>tipo de calvicie</strong> y luego ingresa tu{" "}
              <strong>edad</strong> y <strong>país</strong>.
            </p>

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
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{o.label}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{o.desc}</div>
                  </button>
                );
              })}
            </div>

            {errors.hairLossType && (
              <div style={{ color: "#dc2626", fontSize: 12, marginBottom: 8 }}>
                {errors.hairLossType}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 0.8 }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Edad</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  placeholder="35"
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                    border: errors.age ? "1px solid #dc2626" : "1px solid #d1d5db",
                    fontSize: 13,
                  }}
                />
                {errors.age && (
                  <div style={{ fontSize: 11, color: "#dc2626" }}>
                    {errors.age}
                  </div>
                )}
              </div>

              <div style={{ flex: 1.4 }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>País</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="España, México, Argentina..."
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                    border: errors.country
                      ? "1px solid #dc2626"
                      : "1px solid #d1d5db",
                    fontSize: 13,
                  }}
                />
                {errors.country && (
                  <div style={{ fontSize: 11, color: "#dc2626" }}>
                    {errors.country}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
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
                }}
              >
                Atrás
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
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Paso 3 */}
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
              Recibe tus resultados por WhatsApp
            </h3>

            <p
              style={{
                fontSize: 14,
                color: "#444",
                marginBottom: 14,
              }}
            >
              Ingresa tu <strong>número de WhatsApp con código de país</strong>.
              Te enviaremos tu resultado de idoneidad y tu{" "}
              <strong>precio final con el 30% de descuento</strong>.
            </p>

            <label
              style={{
                fontSize: 13,
                fontWeight: 600,
                display: "block",
                marginBottom: 4,
              }}
            >
              Número de WhatsApp (con código de país)
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+34 6XX XXX XXX"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: errors.phone ? "1px solid #dc2626" : "1px solid #d1d5db",
                marginBottom: 6,
                fontSize: 14,
              }}
            />

            {errors.phone && (
              <div style={{ fontSize: 11, color: "#dc2626" }}>{errors.phone}</div>
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
                }}
              >
                Atrás
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
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                💬 Enviar mis resultados
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
              Al tocar el botón de WhatsApp, enviaremos tus respuestas a nuestro
              equipo y te responderemos con tu idoneidad y tu precio exacto.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
