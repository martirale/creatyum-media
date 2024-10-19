"use client";

import React, { useState } from "react";
import Link from "next/link";
import { handleSubscription } from "@utils/NewsletterAction";

export default function SidebarNewsletter() {
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
    <div>
      <div className="rounded-2xl mb-8 text-yellow bg-black border border-black dark:text-black dark:bg-yellow dark:border-yellow md:rounded-3xl">
        <div className="p-4">
          <div className="container mx-auto">
            <div class="grid grid-cols-1 gap-4">
              {/* COL TITLE */}
              <div className="col-span-1">
                <h2 className="font-extrabold text-lg uppercase">Newsletter</h2>
              </div>

              {/* COL FORM */}
              <div className="col-span-1 text-center py-2">
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

                {/* NEWSLETTER FORM */}
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        maxLength="50"
                        required
                        className="px-5 py-3 w-full rounded-full block bg-black text-yellow placeholder:text-yellow border border-yellow dark:bg-yellow dark:text-black dark:placeholder:text-black dark:border-black"
                      />
                    </div>
                    <div className="w-full">
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        maxLength="100"
                        required
                        className="px-5 py-3 w-full rounded-full block bg-black text-yellow placeholder:text-yellow border border-yellow dark:bg-yellow dark:text-black dark:placeholder:text-black dark:border-black"
                      />
                    </div>
                    <div className="w-full">
                      <button className="px-5 py-3 w-full rounded-full font-bold uppercase bg-yellow text-black border border-yellow hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-black dark:hover:bg-yellow dark:hover:text-black">
                        Suscribirme
                      </button>
                    </div>
                  </div>

                  {/* TERMS */}
                  <div className="w-full mt-4 mb-0 px-4 lg:px-8">
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
                      </Link>{" "}
                      así como los{" "}
                      <Link
                        href="/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        términos de uso
                      </Link>
                      .
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
