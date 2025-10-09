import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import WpLink from "../wp";
import "./styles.css";

export default function BeforeAfter({
  before_after,
  wp_message,
  phone,
  lang
}) {
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
            {before_after.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className={`before-after-card show`}
                >
                  <Image
                    src={image}
                    width={400}
                    height={300}
                    quality={60}
                    alt="before-after"
                  />
                </div>
              );
            })}
          </Slider>
          <p className="ba-privacy"> {before_after.privacy}</p>
        </div>
      </div>
    </section>
  );
}
