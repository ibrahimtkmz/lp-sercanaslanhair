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
        // Change to your desired target location
        window.location.href = "#pricing";
      }}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#e60023",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: "8px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      🎁 Get 30% New Year Discount!
    </button>
  );
}
