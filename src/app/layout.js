import "../styles/globals.css";
import { Roboto, BricolageGrotesque } from "../components/CustomFonts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Creatyum Media — Divulgación sobre diseño y creatividad",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
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
