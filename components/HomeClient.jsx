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
  }, [props.lang]);

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
        <Service
          services={props.services}
          phone={props.phone}
          wp_message={props.wp_message}
          lang={props.lang}
        />
        <Hospital hospital={props.hospital} lang={props.lang} />
        <Faq
          faq={props.faq}
          phone={props.phone}
          lang={props.lang}
          wp_message={props.wp_message}
        />
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
