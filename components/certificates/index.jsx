import "./styles.css";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function Certificates({ certificates }) {
  return (
    <section className="certificates">
      <div className="certificates-inner">
        <h2 dangerouslySetInnerHTML={{ __html: certificates.title }} />
        <Marquee gradient={true} gradientColor="#041548">
          {[1, 2, 3, 4, 5, 6].map((_, i) => {
            return (
              <div key={i} className="marquee-item">
                <Image
                  src={`/images/cer-${i + 1}.png`}
                  width={208}
                  height={156}
                  alt="certificates"
                />
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
