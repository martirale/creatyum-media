"use client";
import { useEffect } from "react";
import Script from "next/script";
import Cookies from "js-cookie";

export default function GoogleAnalytics({ gaId }) {
  useEffect(() => {
    const hasConsented = Cookies.get("cookie_consent"); // Lee la cookie que definiste
    if (hasConsented) {
      // Agrega la etiqueta de Google Analytics solo si el usuario ha dado su consentimiento
      (function () {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", gaId);
        };
      })();
    }
  }, [gaId]);

  return (
    <>
      {Cookies.get("cookie_consent") && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
