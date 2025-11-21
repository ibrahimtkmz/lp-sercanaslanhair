"use client";
import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WpSticky({ wp_message, phone }) {
  return (
    <>
      <Link
        href={`https://wa.me/905467372284?text=${wp_message}`}
        id="whatsapp-fab"
        className="wp-link"
      >
        <FaWhatsapp />
      </Link>
    </>
  );
}
