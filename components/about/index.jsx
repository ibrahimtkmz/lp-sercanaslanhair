import Image from "next/image";
import Link from "next/link";
import "./styles.css";

export default function About({ about, phone, wp_message }) {
  const link = `https://wa.me/${phone}?text=${wp_message}`;
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-content">
          <article>
            <header style={{ marginBottom: "1rem" }}>
              <h2 dangerouslySetInnerHTML={{ __html: about.title }} />
            </header>
            <p dangerouslySetInnerHTML={{ __html: about.description }} />
            <Link href={link} className="wp-link">
              {about.button}
              <Image
                src={"/images/btn-arrow.svg"}
                width={10}
                height={5}
                style={{ height: "auto" }}
                alt="arrow"
              />
            </Link>
            <Image src={"/images/d.png"} width={150} height={137.5} style={{ height: "auto" }} alt="doctor"
            quality={60} 
            />
            <p>Treatment takes place at partner’s clinics which have the hauthorization for a medical tourism.</p>
          </article>
          
        </div>
        <div className="about-image">
        </div>
        <div className="about-cta">
          <Image
            src={"/images/video-call-person.png"}
            width={429}
            height={530}
            style={{ height: "auto" }}
            alt="cta"
          />
          <p dangerouslySetInnerHTML={{ __html: about.video }} />
          <Link className="wp-link" href={link}>
            <Image
              src={"/images/video-call.png"}
              width={429}
              height={530}
              style={{ height: "auto" }}
              alt="cta"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
