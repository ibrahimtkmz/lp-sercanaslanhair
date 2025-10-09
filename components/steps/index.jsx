import React from "react";
import "./styles.css";
import Image from "next/image";
export default function Steps({ steps }) {
  return (
    <section className="steps" id="step">
      <div className="steps-inner">
        <h2 dangerouslySetInnerHTML={{ __html: steps.title }} />
        <div className="steps-content">
          {steps.all_steps.map((step, index) => {
            return (
              <div key={index} className="step-item">
                <h3 dangerouslySetInnerHTML={{ __html: step.title }} />
                <div className="step-inner">
                  <Image
                    src={`/images/step-${index + 1}.png`}
                    width={45}
                    height={60}
                    alt={step.title}
                  />
                  <p dangerouslySetInnerHTML={{ __html: step.description }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
