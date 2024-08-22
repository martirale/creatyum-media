"use client";
import { useEffect } from "react";
import Script from "next/script";
import Cookies from "js-cookie";

export default function GoogleAnalytics({ gaId }) {
  useEffect(() => {
    const hasConsented = Cookies.get("cookie_consent"); // Lee la cookie que definiste
    if (hasConsented) {
      // Activa Google Analytics solo si el usuario ha dado su consentimiento
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", gaId);
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
