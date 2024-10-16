import React from "react";
import AboutPageContent from "./AboutPageContent";

export const metadata = {
  title: "Sobre Creatyum | Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Sobre Creatyum | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    url: "https://creatyum.media/about",
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
    title: "Sobre Creatyum | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/about",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Sobre Creatyum</h1>

      <AboutPageContent />
    </div>
  );
}
