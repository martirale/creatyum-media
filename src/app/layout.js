import "../styles/globals.css";
import { Roboto, BricolageGrotesque } from "../components/CustomFonts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${Roboto.variable} ${BricolageGrotesque.variable} font-Roboto font-light bg-yellow text-black dark:bg-black dark:text-yellow custom-vh`}
      >
        <Header />

        <main className="container mx-auto pt-24 md:pt-28">{children}</main>

        <Footer />
      </body>
      <GoogleAnalytics gaId="G-V5TV2RSE21" />
    </html>
  );
}
