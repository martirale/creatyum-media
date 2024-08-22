"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const GoogleAnalytics = dynamic(() => import("../components/GoogleAnalytics"), {
  ssr: false,
});

const CookieConsentBanner = dynamic(
  () => import("../components/CookieConsentBanner"),
  { ssr: false }
);

export default function CookieConsentManager({ gaId }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (consent === "accepted") {
      setCookiesAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    setCookiesAccepted(true);
    // Inicializa Google Analytics u otros scripts
  };

  const handleReject = () => {
    setCookiesAccepted(false);
    // Lógica para rechazar cookies, si es necesario
  };

  return (
    <>
      {!cookiesAccepted && (
        <CookieConsentBanner onAccept={handleAccept} onReject={handleReject} />
      )}
      {cookiesAccepted && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
