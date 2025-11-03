import Form from "../form";
import "./styles.css";
import Image from "next/image";

export default function Hero({ hero, form, lead }) {
  return (
    <section className="hero">
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
