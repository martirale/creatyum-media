import React from "react";
import "./globals.css";
import { Roboto, BricolageGrotesque } from "../components/CustomFonts";
import ScrollToTop from "../components/ScrollToTop";
import BackToTop from "../components/BackToTop";
import GoogleAnalytics from "../components/GoogleAnalytics";
import CookieConsentManager from "../components/CookieConsentManager";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-V5TV2RSE21" />
        )}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Creatyum Media"
          href="https://creatyum.media/api/rss"
        />
      </head>

      <body
        className={`${Roboto.variable} ${BricolageGrotesque.variable} font-Roboto font-light bg-yellow text-black dark:bg-black dark:text-yellow custom-vh`}
      >
        <ThemeProvider>
          <ScrollToTop />

          {children}

          <BackToTop />

          <CookieConsentManager gaId="G-V5TV2RSE21" />
        </ThemeProvider>
      </body>
    </html>
  );
}
