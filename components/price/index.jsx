import "./styles.css";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";

export default function Price({ price, phone, wp_message, variant,lang }) {
  const link = `https://wa.me/${phone}?text=${wp_message}`;
  var settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: variant === "bbl" ? 2 : 3,
    slidesToScroll: 1,
    initialSlide: 1,
    rtl: lang == "ar" ? true  : false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 815,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="price" id="package">
      <div className="price-inner">
        <h2 dangerouslySetInnerHTML={{ __html: price.title }} />
        <span dangerouslySetInnerHTML={{ __html: price.subtitle }} />
        <Slider className={variant === "bbl" ? "bbl-card" : ""} {...settings}>
          {price.prices.map((item, i) => {
            return (
              <div key={i} className="price-item">
                <h3
                  dangerouslySetInnerHTML={{
                    __html: item.title,
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.subtitle,
                  }}
                />

                <div className="price-list">{item.price}</div>
                <Link className="wp-link " href={link}>
                  {item.button}{" "}
                  <Image
                    src={"/images/btn-arrow.svg"}
                    width={6}
                    height={5}
                    style={{ height: "auto" }}
                    alt="arrow"
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
