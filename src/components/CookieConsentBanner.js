"use client";

import React from "react";
import Cookies from "js-cookie";

export default function CookieConsentBanner({ onAccept, onReject }) {
  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    onAccept(); // Ejecuta la función onAccept cuando el usuario acepta las cookies
  };

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    onReject(); // Ejecuta la función onReject cuando el usuario rechaza las cookies
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-black text-yellow p-4 text-center dark:bg-yellow dark:text-black">
      <p>
        Usamos cookies para mejorar tu experiencia. Acepta o rechaza para
        continuar.
      </p>
      <div className="mt-2 space-x-4">
        <button
          onClick={handleAccept}
          className="mt-2 px-4 py-2 bg-black text-yellow rounded-full border border-yellow hover:bg-yellow hover:text-black dark:bg-yellow dark:text-black dark:border-black dark:hover:bg-black dark:hover:text-yellow"
        >
          Aceptar
        </button>
        <button
          onClick={handleReject}
          className="mt-2 px-4 py-2 text-yellow hover:underline dark:text-black"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
