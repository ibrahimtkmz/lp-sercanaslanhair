import React from "react";
import Image from "next/image";
import "./styles.css";
export default function Types({ types, variant }) {
  return (
    <section className="types" id="procedures">
      <div className="types-inner">
        <h2>{types.title}</h2>
        <div className="types-content">
          <ul>
            {types.all_procedures.map((item, i) => {
              return (
                <li key={i}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              );
            })}
          </ul>
          <Image
            unoptimized
            src={
              variant === "face"
                ? `/images/${variant}/image.png`
                : `/images/${variant}/image.webp`
            }
            width={300}
            height={300}
            alt={types.title}
          />
        </div>
      </div>
    </section>
  );
}
