"use client";
import Form from "../form";
import "./styles.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero({ hero, form, lead }) {
  const pathname = usePathname();
  const [bgImage, setBgImage] = useState("/images/hero.webp"); // default

  useEffect(() => {
    if (pathname?.toLowerCase().includes("dental-treatment-in-turkey")) {
      setBgImage("/images/herodiş.webp"); // dental sayfası için
    } else {
      setBgImage("/images/hero.webp"); // diğer sayfalar
    }
  }, [pathname]);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-inner">
        <article>
          <span className="star">
            <Image
              src={"/images/star.png"}
              width={140}
              height={27}
              alt="star reviews"
            />
            {hero.reviews}
          </span>
          <h1 dangerouslySetInnerHTML={{ __html: hero.title }} />
          {hero.subtitle && (
            <p
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: hero.subtitle }}
            />
          )}
        </article>
        <div className="hero-form">
          <Form country="country1" phone="phone1" form={form} lead={lead} />
        </div>
      </div>
    </section>
  );
}
