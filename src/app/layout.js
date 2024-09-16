import "../styles/globals.css";
import { Roboto, BricolageGrotesque } from "../components/CustomFonts";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import BackToTop from "../components/BackToTop";
import GoogleAnalytics from "../components/GoogleAnalytics";
import CookieConsentManager from "../components/CookieConsentManager";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata = {
  title: "Creatyum Media — Divulgación sobre diseño y creatividad",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Creatyum Media — Divulgación sobre diseño y creatividad",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    url: "https://creatyum.media",
    type: "website",
    images: [
      {
        url: "https://creatyum.media/creatyum-default-cover.webp",
        width: 1200,
        height: 630,
        alt: "Creatyum Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatyum Media — Divulgación sobre diseño y creatividad",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media",
  rss: "https://creatyum.media/api/rss",
  icons: {
    icon: "/favicon.png",
  },
};

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
          <Header />

          <main className="container mx-auto pt-24 md:pt-28">{children}</main>

          <BackToTop />
          <Footer />

          <CookieConsentManager gaId="G-V5TV2RSE21" />
        </ThemeProvider>
      </body>
    </html>
  );
}
