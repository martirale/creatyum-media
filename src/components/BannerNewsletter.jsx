"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { handleSubscription } from "../utils/NewsletterAction";

export default function BannerNewsletter() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");

    const data = { name, email };

    if (!acceptPrivacyPolicy) {
      setMessage({
        text: "Debes aceptar la política de privacidad.",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    const result = await handleSubscription(data);

    if (result) {
      setMessage({ text: "¡Suscripción exitosa!", type: "success" });
      event.target.reset();
      setAcceptPrivacyPolicy(false);
    } else {
      setMessage({ text: "Hubo un error al suscribirte.", type: "error" });
    }

    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <div className="mb-8 md:mb-16">
      <div className="p-6 rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:p-12 md:rounded-3xl">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-5xl font-BricolageGrotesque font-extrabold md:text-7xl">
              Newsletter{" "}
              <FontAwesomeIcon
                icon={faEnvelope}
                className="w-11 h-11 md:w-16 md:h-16"
              />
            </h2>

            <div className="text-center mt-8 py-2 md:mt-0 lg:py-0">
              {message.text && (
                <div
                  className={`mb-4 p-3 w-full rounded-full font-bold text-center ${
                    message.type === "success"
                      ? "text-[#2F855A] bg-[#B2F5EA]"
                      : "text-[#F56565] bg-[#FED7D7]"
                  }`}
                >
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex w-full gap-4">
                <div className="flex flex-col w-full items-center">
                  <div className="flex flex-col md:flex-row w-full gap-4">
                    <input
                      type="text"
                      placeholder="Nombre"
                      name="name"
                      maxLength="50"
                      required
                      className="px-5 py-3 rounded-full block bg-black text-yellow placeholder:text-yellow border border-yellow dark:bg-yellow dark:text-black dark:placeholder:text-black dark:border-black"
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      name="email"
                      maxLength="100"
                      required
                      className="px-5 py-3 rounded-full block bg-black text-yellow placeholder:text-yellow border border-yellow dark:bg-yellow dark:text-black dark:placeholder:text-black dark:border-black"
                    />
                    <button className="px-5 py-3 rounded-full font-bold uppercase bg-yellow text-black border border-yellow hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-black dark:hover:bg-yellow dark:hover:text-black">
                      Suscribirme
                    </button>
                  </div>

                  <div className="flex items-center mt-4 mb-0">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      name="privacyPolicy"
                      checked={acceptPrivacyPolicy}
                      onChange={() =>
                        setAcceptPrivacyPolicy(!acceptPrivacyPolicy)
                      }
                      className="mr-2"
                      required
                    />
                    <label htmlFor="privacyPolicy" className="text-sm">
                      Acepto la{" "}
                      <Link
                        href="/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        política de privacidad
                      </Link>
                      .
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
