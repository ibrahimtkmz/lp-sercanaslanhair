"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

  // --- KESİN ÇÖZÜM (SİGORTA) ---
  // Eğer props.phone boş gelirse (undefined), otomatik olarak bu numarayı kullan:
  const activePhone = props.phone || "905467372284";
  
  // Eğer görünür numara boş gelirse bunu kullan:
  const activeVisiblePhone = props.visible_en || "+90 (546) 737 22 84";
  // -----------------------------

  useEffect(() => {
    if (props.lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    }
    document.documentElement.lang = props.lang;
    const { hash, pathname } = window.location;

    if (hash) {
      setTimeout(() => {
        router.push(pathname + hash);
      }, 1000);
    }
  }, [props.lang, router]); // router eklendi, build uyarısı vermemesi için

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
        {/* Tüm bileşenlere activePhone gönderiyoruz */}
        <About
          about={props.about}
          phone={activePhone}
          wp_message={props.wp_message}
          lang={props.lang}
        />
        <Steps steps={props.steps} lang={props.lang} />
        <BeforeAfter
          variant={props.variant}
          before_after={props.before_after}
          lang={props.lang}
          phone={activePhone}
          wp_message={props.wp_message}
        />
        <Reviews
          reviews={props.reviews}
          phone={activePhone}
          wp_message={props.wp_message}
          variant={props.variant}
          lang={props.lang}
        />
        <Icons icons={props.icons} lang={props.lang} />
        <Service
          services={props.services}
          phone={activePhone}
          wp_message={props.wp_message}
          lang={props.lang}
        />
        <Hospital hospital={props.hospital} lang={props.lang} />
        <Faq
          faq={props.faq}
          phone={activePhone}
          lang={props.lang}
          wp_message={props.wp_message}
        />
      </main>
      
      {/* Sağ alttaki yapışkan buton için düzeltme */}
      <WpSticky
        wp_message={props.wp_message}
        lang={props.lang}
        phone={activePhone}
      />
      
      {/* Footer görünür numara düzeltmesi */}
      <Footer
        footer={props.footer}
        lang={props.lang}
        phone_visible={activeVisiblePhone}
      />
    </>
  );
}
