"use client";
import { useRef, useState } from "react";
import _debounce from "lodash/debounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useIntlTelInput from "../../hooks/useIntlTelInput";

export default function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const iti = useIntlTelInput(props.phone, props.country);
  const contactFormRef = useRef(null);
  const [isValidNumber, setIsValidNumber] = useState(false);
  const router = useRouter();


  // submit
  async function ContactFormCheckMandatory(event) {
    event.preventDefault();

    let isValidNumber = false;
    isValidNumber = iti.isValidNumber();

    try {
      if (!isValidNumber) {
        alert(props.form.form_phone_validation);
        return;
      }

      setIsValidNumber(true);

      const validNumber = iti.getNumber();

      const postData = {
        name: name,
        phone: validNumber,
        email: email,
        language: props.lead.LEAD_LANGUAGE,
        source_language: props.lead.LEAD_LANGUAGE,
      };

      setEmail("");
      setName("");
      setPhone("");

      await fetch(`/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...postData }),
      });

      router.push("/thank-you");
    } catch (error) {
      console.error("API isteği başarısız:", error);
    }
  }

  // phone change handler
  const phoneChangeHandler = async (e) => {
    e.target.setCustomValidity("");
    const cleanedValue = e.target.value.replace(/\D/g, "");
    setPhone(cleanedValue);

    if (iti.isValidNumber()) {
     setIsValidNumber(true);
    }
    else{
      setIsValidNumber(false);
    }
  };

  // E-posta değişiklik işleyicisi
  const debouncedEmailChangeHandler = _debounce(async (e) => {
    setEmail(e.target.value);
  }, 200);

  return (
    <div id="free-consultation">
      <h2 className="keep-rtl" id="get-a-price">
        {props.title ? props.title : props.form.title}
      </h2>
      <p className="keep-rtl">{props.form.subtitle}</p>

      <form
        ref={contactFormRef}
        id="contactForm"
        acceptCharset="UTF-8"
        onSubmit={(event) => ContactFormCheckMandatory(event)}
      >
        <label style={{ display: "none" }} htmlFor="Last_Name"></label>
        <input
          className="keep-rtl name-data-test-gtm"
          type="text"
          id="Last_Name"
          name="Last Name"
          maxLength="80"
          placeholder={props.form.placeholder_name}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="Phone" style={{ display: "none" }}></label>

        <input
          className="phone-data-test-gtm"
          type="tel"
          id={props.phone}
          name="Phone"
          autoComplete="tel"
          maxLength="15"
          placeholder={props.form.placeholder_phone}
          value={phone}
          required
          onChange={(e) => phoneChangeHandler(e)}
        />

        <label htmlFor="Email" style={{ display: "none" }}></label>
        <input
          className="keep-rtl email-data-gtm"
          type="email"
          id="Email"
          name="Email"
          maxLength="100"
          placeholder={props.form.placeholder_mail}
          onChange={(e) => debouncedEmailChangeHandler(e)}
        />

        <input
          style={{ display: "none" }}
          type="hidden"
          id={props.country}
          name="Country"
          maxLength="100"
          value="DefaultCountry"
          readOnly
        />

        <button 
        disabled={!isValidNumber}
        type="submit" value="Submit" id="formsubmit" title="Submit"
        className={`submit ${!isValidNumber ? "disabled" : ""}`}
        >
          <Image
            src={"/images/button-arrow.png"}
            width={52}
            height={52}
            alt="wp button arrow"
            unoptimized
          />
          <span>{props.form.button}</span>
        </button>
        <span className="privacy">
          <Image
            src={"/images/privacy.png"}
            width={13}
            height={11}
            alt="privacy"
            style={{ height: "auto" }}
          />
          {props.form.privacy}
        </span>
      </form>
    </div>
  );
}
