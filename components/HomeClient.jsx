"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Header from "./header";
import Hero from "./hero";
import WpSticky from "./wp-sticky";
import About from "./about";
import Steps from "./steps";
import BeforeAfter from "./before-after";
import Reviews from "./reviews";
import Icons from "./icons";
import Service from "./services";
import Hospital from "./hospital";
import Faq from "./faq";
import Footer from "./footer";

export default function HomeClient(props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDentalPage, setIsDentalPage] = useState(false);

  useEffect(() => {
    if (props.lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    }
    document.documentElement.lang = props.lang;
    const { hash, pathname } = window.location;

    // Hash varsa sayfayı scroll eder
    if (hash) {
      setTimeout(() => {
        router.push(pathname + hash);
      }, 1000);
    }

    // ✅ Route'u normalize edip kontrol et
    const currentPath = window.location.pathname
      .toLowerCase()
      .replace(/\/+$/, ""); // sondaki "/"'yi sil

    if (currentPath.includes("dental-treatment-in-turkey")) {
      setIsDentalPage(true);
    }
  }, [props.lang, router]);

  return (
    <>
      <Header header={props.header} />
      <main>
        <Hero
          hero={props.hero}
          form={props.form}
          lead={props.lead}
          variant={props.variant}
          lang={props.lang}
        />
        <About
          about={props.about}
          phone={props.phone}
          wp_message={props.wp_message}
          lang={props.lang}
        />
        <Steps steps={props.steps} lang={props.lang} />
        <BeforeAfter
          variant={props.variant}
          before_after={props.before_after}
          lang={props.lang}
          phone={props.phone}
          wp_message={props.wp_message}
        />
        <Reviews
          reviews={props.reviews}
          phone={props.phone}
          wp_message={props.wp_message}
          variant={props.variant}
          lang={props.lang}
        />
        <Icons icons={props.icons} lang={props.lang} />

        {/* 🟩 Bu iki bölüm sadece dental sayfası dışında gösterilir */}
        {!isDentalPage && (
          <Service
            services={props.services}
            phone={props.phone}
            wp_message={props.wp_message}
            lang={props.lang}
          />
        )}

        <Hospital hospital={props.hospital} lang={props.lang} />

        {!isDentalPage && (
          <Faq
            faq={props.faq}
            phone={props.phone}
            lang={props.lang}
            wp_message={props.wp_message}
          />
        )}
      </main>
      <WpSticky
        wp_message={props.wp_message}
        lang={props.lang}
        phone={props.phone}
      />
      <Footer
        footer={props.footer}
        lang={props.lang}
        phone_visible={props.visible_en}
      />
    </>
  );
}
