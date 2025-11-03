"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import WpLink from "../wp";
import "./styles.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BeforeAfter({ before_after, wp_message, phone, lang }) {
  const pathname = usePathname();
  const [images, setImages] = useState(before_after.images);

  useEffect(() => {
    if (pathname?.toLowerCase().includes("dental-treatment-in-turkey")) {
      setImages([
        "/images/d1.jpeg",
        "/images/d2.jpeg",
        "/images/d3.jpeg",
        "/images/d4.jpeg",
        "/images/d5.jpeg",
        "/images/d6.jpeg",
        "/images/d7.jpeg",
        "/images/d8.jpeg",
      ]);
    } else {
      setImages(before_after.images); // diğer sayfalar
    }
  }, [pathname, before_after.images]);

  const link = `https://wa.me/${phone}?text=${wp_message}`;
  
  var settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 2,
    rtl: lang == "ar" ? true  : false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="before-after" id="beforeAfter">
      <div className="before-after-inner">
        <article>
          <h2 dangerouslySetInnerHTML={{ __html: before_after.title }} />
          <p dangerouslySetInnerHTML={{ __html: before_after.subtitle }} />
          <WpLink
            phone={phone}
            wp_message={wp_message}
            title={before_after.button}
          />
        </article>
        <div className="ba-slider">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className={`before-after-card show`}>
                <Image
                  src={image}
                  width={400}
                  height={300}
                  quality={60}
                  alt="before-after"
                />
              </div>
            ))}
          </Slider>
          <p className="ba-privacy">{before_after.privacy}</p>
        </div>
      </div>
    </section>
  );
}
