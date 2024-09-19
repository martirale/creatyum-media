import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export const metadata = {
  title: "Creatyum Studio — Branding & web design",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Creatyum Studio — Branding & web design",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    url: "https://studio.creatyum.com",
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
    title: "Creatyum Studio — Branding & web design",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://studio.creatyum.com",
  icons: {
    icon: "/favicon.png",
  },
};

export default function StudioLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mx-auto pt-24 md:pt-28">{children}</main>
      <Footer />
    </>
  );
}
